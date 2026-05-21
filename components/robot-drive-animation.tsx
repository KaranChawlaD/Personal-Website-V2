import Image from "next/image";

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

export function RobotDriveAnimation() {
  return (
    <div
      className="robot-drive-lane pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-0 overflow-visible"
      aria-hidden
    >
      <div
        className="robot-drive-motion h-20 sm:h-28"
        style={
          {
            "--robot-sprite-w": `${SPRITE_WIDTH}px`,
            "--robot-sprite-w-sm": `${SPRITE_WIDTH_SM}px`,
          } as React.CSSProperties
        }
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
