import type { HTMLAttributes, ReactNode } from "react";

import { asset, cn } from "@/lib/utils";

const FRAME_WIDTH = 1470;
const FRAME_HEIGHT = 3000;
const SCREEN_X = 75;
const SCREEN_Y = 66;
const SCREEN_WIDTH = 1320;
const SCREEN_HEIGHT = 2868;
const SCREEN_RADIUS = 170;
// Extends the screen under the opaque bezel so the frame's anti-aliased cutout edge never reveals the page behind.
const SCREEN_BLEED = 8;

const bleedWidth = SCREEN_WIDTH + SCREEN_BLEED * 2;
const bleedHeight = SCREEN_HEIGHT + SCREEN_BLEED * 2;
const bleedRadius = SCREEN_RADIUS + SCREEN_BLEED;

const screenStyle = {
  left: `${((SCREEN_X - SCREEN_BLEED) / FRAME_WIDTH) * 100}%`,
  top: `${((SCREEN_Y - SCREEN_BLEED) / FRAME_HEIGHT) * 100}%`,
  width: `${(bleedWidth / FRAME_WIDTH) * 100}%`,
  height: `${(bleedHeight / FRAME_HEIGHT) * 100}%`,
  borderRadius: `${(bleedRadius / bleedWidth) * 100}% / ${(bleedRadius / bleedHeight) * 100}%`,
};

export interface IphoneProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  priority?: boolean;
  children?: ReactNode;
}

export function Iphone({ src, alt = "", priority = false, children, className, style, ...props }: IphoneProps) {
  return (
    <div
      className={cn("relative inline-block w-full align-middle leading-none", className)}
      style={{ aspectRatio: `${FRAME_WIDTH}/${FRAME_HEIGHT}`, ...style }}
      {...props}
    >
      <div className="absolute z-0 overflow-hidden bg-graphite" style={screenStyle}>
        {children ??
          (src && (
            <img
              src={src}
              alt={alt}
              width={660}
              height={1434}
              decoding="async"
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              className="block size-full object-cover object-top"
            />
          ))}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.14)_0%,rgb(255_255_255/0.04)_28%,transparent_42%)]"
        />
      </div>

      <img
        src={asset("/images/device/iphone-17-pro-max-silver.webp")}
        alt=""
        aria-hidden="true"
        width={735}
        height={1500}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        draggable={false}
        className="pointer-events-none absolute inset-0 z-10 size-full select-none"
      />
    </div>
  );
}
