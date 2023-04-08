"use client";

import { useState } from "react";

export default function ProjectCard({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  return (
    <div
      className={className}
      style={{ "--left": `${mouse.x}px`, "--top": `${mouse.y}px` } as any}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <div className="flex flex-col gap-6 p-6 relative z-10">{children}</div>
      <div
        className="absolute rounded inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          // zinc-500 = rgb(113, 113, 122)
          backgroundImage:
            "radial-gradient(900px circle at var(--left) var(--top), rgba(113, 113, 122, 0.12), transparent 30%)",
        }}
      />
    </div>
  );
}
