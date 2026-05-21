import Image from "next/image";

const ROBOT_FRAMES = [
  { src: "/cartoon_robot_1.png", width: 458, height: 445 },
  { src: "/cartoon_robot_2.png", width: 438, height: 411 },
  { src: "/cartoon_robot_3.png", width: 495, height: 414 },
] as const;

export function RobotDriveAnimation() {
  return (
    <div
      className="robot-drive-lane pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-0 overflow-visible"
      aria-hidden
    >
      <div className="robot-drive-motion">
        <div className="robot-drive-sprite relative h-20 sm:h-28">
          {ROBOT_FRAMES.map((frame, index) => (
            <Image
              key={frame.src}
              src={frame.src}
              alt=""
              width={frame.width}
              height={frame.height}
              className={`robot-drive-frame robot-drive-frame-${index + 1} absolute left-0 top-0 h-full w-auto max-w-none`}
              sizes="(max-width: 640px) 80px, 112px"
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
