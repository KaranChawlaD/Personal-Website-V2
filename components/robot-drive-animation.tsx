"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ROBOT_FRAMES = [
  { src: "/cartoon_robot_1.png", width: 458, height: 445 },
  { src: "/cartoon_robot_2.png", width: 438, height: 411 },
  { src: "/cartoon_robot_3.png", width: 495, height: 414 },
] as const;

const DISPLAY_HEIGHT = { default: 80, sm: 112 } as const;
const LAP_DURATION_MS = 14_000;
const MAX_SPEED_MULTIPLIER = 4;

function spriteWidthAtHeight(heightPx: number) {
  return Math.ceil(
    Math.max(
      ...ROBOT_FRAMES.map((frame) => (heightPx * frame.width) / frame.height)
    )
  );
}

const SPRITE_WIDTH = spriteWidthAtHeight(DISPLAY_HEIGHT.default);
const SPRITE_WIDTH_SM = spriteWidthAtHeight(DISPLAY_HEIGHT.sm);

function translateForProgress(progress: number, spriteWidth: number) {
  const start = -1.2 * spriteWidth;
  const end = window.innerWidth + 1.2 * spriteWidth;
  return start + progress * (end - start);
}

function setAnimationPlaybackRate(anim: Animation, rate: number) {
  try {
    anim.updatePlaybackRate(rate);
  } catch {
    anim.playbackRate = rate;
  }
}

function applyFramePlaybackRate(motion: HTMLElement, rate: number) {
  for (const anim of motion.getAnimations({ subtree: true })) {
    const effect = anim.effect;
    if (!(effect instanceof KeyframeEffect)) continue;
    const target = effect.target;
    if (
      target instanceof HTMLElement &&
      target.classList.contains("robot-drive-frame")
    ) {
      setAnimationPlaybackRate(anim, rate);
    }
  }
}

type RobotDriveSpeedContextValue = {
  speedMultiplier: number;
  onSpeedUp: () => void;
  onReset: () => void;
};

const RobotDriveSpeedContext = createContext<RobotDriveSpeedContextValue | null>(
  null
);

export function RobotDriveSpeedProvider({ children }: { children: ReactNode }) {
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const onSpeedUp = useCallback(() => {
    setSpeedMultiplier((current) =>
      Math.min(current * 1.5, MAX_SPEED_MULTIPLIER)
    );
  }, []);

  const onReset = useCallback(() => {
    setSpeedMultiplier(1);
  }, []);

  return (
    <RobotDriveSpeedContext.Provider
      value={{ speedMultiplier, onSpeedUp, onReset }}
    >
      {children}
    </RobotDriveSpeedContext.Provider>
  );
}

type RobotDriveAnimationProps = {
  layout: "inline" | "overlay";
};

export function RobotDriveAnimation({ layout }: RobotDriveAnimationProps) {
  const ctx = useContext(RobotDriveSpeedContext);
  if (!ctx) {
    throw new Error("RobotDriveAnimation must be used within RobotDriveSpeedProvider");
  }

  const { speedMultiplier, onSpeedUp, onReset } = ctx;
  const isOverlay = layout === "overlay";
  const atMaxSpeed = speedMultiplier >= MAX_SPEED_MULTIPLIER;
  const motionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const speedRef = useRef(1);

  speedRef.current = speedMultiplier;

  useLayoutEffect(() => {
    const motion = motionRef.current;
    if (!motion) return;
    applyFramePlaybackRate(motion, speedMultiplier);
  }, [speedMultiplier]);

  useEffect(() => {
    const motion = motionRef.current;
    if (!motion) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;

      const lapMs = LAP_DURATION_MS / speedRef.current;
      progressRef.current = (progressRef.current + dt / lapMs) % 1;

      const spriteWidth = motion.offsetWidth || SPRITE_WIDTH;
      const x = translateForProgress(progressRef.current, spriteWidth);
      motion.style.transform = `translateX(${x}px)`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [layout]);

  const handleClick = () => {
    const motion = motionRef.current;

    if (atMaxSpeed) {
      speedRef.current = 1;
      if (motion) applyFramePlaybackRate(motion, 1);
      onReset();
      return;
    }

    const next = Math.min(speedMultiplier * 1.5, MAX_SPEED_MULTIPLIER);
    speedRef.current = next;
    if (motion) applyFramePlaybackRate(motion, next);
    onSpeedUp();
  };

  const motionStyle = {
    "--robot-sprite-w": `${SPRITE_WIDTH}px`,
    "--robot-sprite-w-sm": `${SPRITE_WIDTH_SM}px`,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "robot-drive-lane z-[1] overflow-visible",
        isOverlay
          ? "robot-drive-lane--overlay pointer-events-none absolute inset-x-0 bottom-0 hidden h-0 sm:block"
          : "relative mt-6 h-20 w-[calc(100%+2rem)] max-w-none -mx-4"
      )}
    >
      <div
        ref={motionRef}
        className={cn(
          "robot-drive-motion",
          isOverlay
            ? "robot-drive-motion--overlay absolute h-28"
            : "relative h-20"
        )}
        style={motionStyle}
      >
        <button
          type="button"
          onClick={handleClick}
          className="group relative h-full w-full cursor-pointer pointer-events-auto border-0 bg-transparent p-0"
          aria-label={
            atMaxSpeed ? "Reset robot speed" : "Speed up the robot"
          }
        >
          <div className="robot-drive-sprite relative h-full">
            <span
              className="robot-drive-hint pointer-events-none absolute top-0 z-10 whitespace-nowrap rounded-full border border-primary/35 bg-primary px-2.5 py-1 font-heading text-xs font-semibold text-primary-foreground opacity-0 shadow-[0_4px_14px_-6px_rgba(110,129,55,0.35)] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
              aria-hidden
            >
              {atMaxSpeed ? "reset" : "click me"}
            </span>
            {ROBOT_FRAMES.map((frame, index) => (
              <Image
                key={frame.src}
                src={frame.src}
                alt=""
                width={frame.width}
                height={frame.height}
                className={`robot-drive-frame robot-drive-frame-${index + 1} absolute left-1/2 top-0 h-full w-auto max-w-none -translate-x-1/2`}
                sizes="(max-width: 640px) 80px, 112px"
                priority={index === 0}
              />
            ))}
          </div>
        </button>
      </div>
    </div>
  );
}
