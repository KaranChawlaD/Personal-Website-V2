"use client";

import {
  createContext,
  useCallback,
  useContext,
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
const BASE_DRIVE_DURATION_S = 14;
const BASE_FRAME_DURATION_S = 0.72;
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

type RobotDriveSpeedContextValue = {
  speedMultiplier: number;
  onSpeedUp: () => void;
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

  return (
    <RobotDriveSpeedContext.Provider value={{ speedMultiplier, onSpeedUp }}>
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

  const { speedMultiplier, onSpeedUp } = ctx;
  const isOverlay = layout === "overlay";
  const driveDuration = BASE_DRIVE_DURATION_S / speedMultiplier;
  const frameDuration = BASE_FRAME_DURATION_S / speedMultiplier;
  const atMaxSpeed = speedMultiplier >= MAX_SPEED_MULTIPLIER;

  const motionStyle = {
    "--robot-sprite-w": `${SPRITE_WIDTH}px`,
    "--robot-sprite-w-sm": `${SPRITE_WIDTH_SM}px`,
    "--robot-drive-duration": `${driveDuration}s`,
    "--robot-frame-duration": `${frameDuration}s`,
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
          onClick={onSpeedUp}
          disabled={atMaxSpeed}
          className="group relative h-full w-full cursor-pointer pointer-events-auto border-0 bg-transparent p-0 disabled:cursor-default"
          aria-label={
            atMaxSpeed ? "Robot is at max speed" : "Speed up the robot"
          }
        >
          <span
            className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-primary/35 bg-primary px-2.5 py-1 font-heading text-xs font-semibold text-primary-foreground opacity-0 shadow-[0_4px_14px_-6px_rgba(110,129,55,0.35)] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 disabled:group-hover:opacity-0"
            aria-hidden
          >
            click me
          </span>
          <div className="robot-drive-sprite relative h-full">
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
