"use client";

import { useEffect, useRef } from "react";
import { cancelFrame, frame } from "framer-motion";
import { ReactLenis, type LenisRef } from "lenis/react";

export default function SmoothScroll() {
  const ref = useRef<LenisRef>(null);

  useEffect(() => {
    const update = ({ timestamp }: { timestamp: number }) =>
      ref.current?.lenis?.raf(timestamp);
    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      ref={ref}
      root
      options={{
        autoRaf: false,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        respectReducedMotion: true,
        stopInertiaOnNavigate: true,
      }}
    />
  );
}
