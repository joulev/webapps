"use client";

import clsx from "clsx";
import { useState } from "react";
import "./project-card.css";

export default function ProjectCard({
  href,
  className,
  children,
}: React.PropsWithChildren<{ href: string; className?: string }>) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx("bg-daw-main-300", className)}
      style={{ "--left": `${mouse.x}px`, "--top": `${mouse.y}px` } as any}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <div className="flex flex-col gap-6 p-6 relative z-10 text-daw-main-600">{children}</div>
      <div className="absolute rounded inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300 project-card-bg" />
      <div className="absolute rounded-[7px] inset-px bg-daw-main-50"></div>
    </a>
  );
}
