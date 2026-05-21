import Image from "next/image";
import { cn } from "@/lib/utils";

const ROBOT_FRAMES = [
  { src: "/cartoon_robot_1.png", width: 458, height: 445 },
  { src: "/cartoon_robot_2.png", width: 438, height: 411 },
  { src: "/cartoon_robot_3.png", width: 495, height: 414 },
] as const;

const DISPLAY_HEIGHT = { default: 80, sm: 112 } as const;

function spriteWidthAtHeight(heightPx: number) {
  return Math.ceil(
    Math.max(
      ...ROBOT_FRAMES.map((frame) => (heightPx * frame.width) / frame.height)
    )
  );
}

const SPRITE_WIDTH = spriteWidthAtHeight(DISPLAY_HEIGHT.default);
const SPRITE_WIDTH_SM = spriteWidthAtHeight(DISPLAY_HEIGHT.sm);

const spriteStyle = {
  "--robot-sprite-w": `${SPRITE_WIDTH}px`,
  "--robot-sprite-w-sm": `${SPRITE_WIDTH_SM}px`,
} as React.CSSProperties;

type RobotDriveAnimationProps = {
  /** In-flow below hero (mobile). Overlay at section bottom (desktop). */
  layout: "inline" | "overlay";
};

export function RobotDriveAnimation({ layout }: RobotDriveAnimationProps) {
  const isOverlay = layout === "overlay";

  return (
    <div
      className={cn(
        "robot-drive-lane pointer-events-none z-[1] overflow-visible",
        isOverlay
          ? "robot-drive-lane--overlay absolute inset-x-0 bottom-0 hidden h-0 sm:block"
          : "relative mt-6 h-20 w-[calc(100%+2rem)] max-w-none -mx-4"
      )}
      aria-hidden
    >
      <div
        className={cn(
          "robot-drive-motion",
          isOverlay
            ? "robot-drive-motion--overlay absolute h-28"
            : "relative h-20"
        )}
        style={spriteStyle}
      >
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
      </div>
    </div>
  );
}
