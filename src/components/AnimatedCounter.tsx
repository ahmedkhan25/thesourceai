"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useTransform, animate, motion } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 2,
}: AnimatedCounterProps) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => {
    // If target has decimals, preserve one decimal place
    if (target % 1 !== 0) {
      return latest.toFixed(1);
    }
    return Math.round(latest).toLocaleString();
  });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(motionValue, target, {
      duration,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [motionValue, target, duration]);

  return (
    <span className="text-4xl font-bold text-source-black">
      {prefix}
      <motion.span ref={ref}>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
