"use client";

import { MotionValue, motion, useMotionTemplate, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

function StaticScore({
  score,
  animatedScore,
}: {
  score: number;
  animatedScore: MotionValue<number>;
}) {
  const d2r = (degree: number) => (degree * Math.PI) / 180;
  const sin = (degree: number) => Math.sin(d2r(degree));
  const cos = (degree: number) => Math.cos(d2r(degree));

  const center = 12;
  const width = 4;

  const f = (x: number) => 65.8656 * Math.pow(1.2035, x) - 60.8656; // f(0) = 5, f(7) = 180, f(10) ≈ 359
  const angle = useTransform(animatedScore, x => f(x));

  const radius = center - width / 2;
  const start = [center, width / 2];
  const end0 = useTransform(angle, x => center + radius * sin(x));
  const end1 = useTransform(angle, x => center - radius * cos(x));
  const largeArcFlag = useTransform(angle, x => (x > 180 ? 1 : 0));

  const pathString = useMotionTemplate`M ${start[0]} ${start[1]} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end0} ${end1}`;

  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
      <circle
        cx={center}
        cy={center}
        r={radius}
        className="stroke-daw-main-300"
        strokeWidth={width}
      />
      <motion.path
        className={score >= 7 ? "stroke-green" : "stroke-yellow"}
        strokeWidth={width}
        strokeLinecap="round"
        d={pathString}
      />
    </svg>
  );
}

export default function Score({ score }: { score: number }) {
  const animatedScore = useSpring(0, { stiffness: 100, damping: 20 });
  useEffect(() => animatedScore.set(score), [score, animatedScore]);
  return <StaticScore score={score} animatedScore={animatedScore} />;
}
