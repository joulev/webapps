"use client";

export default function Clock({ hour = 4, minute = 0 }: { hour?: number; minute?: number }) {
  const hourAngle = (hour % 12) * 30 + minute * 0.5;
  const minuteAngle = minute * 6;
  const hourHandLength = 4;
  const minuteHandLength = 6;
  const hourHandX = hourHandLength * Math.sin((hourAngle * Math.PI) / 180);
  const hourHandY = -hourHandLength * Math.cos((hourAngle * Math.PI) / 180);
  const minuteHandX = minuteHandLength * Math.sin((minuteAngle * Math.PI) / 180);
  const minuteHandY = -minuteHandLength * Math.cos((minuteAngle * Math.PI) / 180);
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" className="stroke-current" strokeWidth={1.5} />
      <path
        d={`M${12 + hourHandX} ${12 + hourHandY} L12 12 L${12 + minuteHandX} ${12 + minuteHandY}`}
        className="stroke-current"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
