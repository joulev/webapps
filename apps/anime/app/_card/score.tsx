export default function Score({ score }: { score: number }) {
  const d2r = (degree: number) => (degree * Math.PI) / 180;
  const sin = (degree: number) => Math.sin(d2r(degree));
  const cos = (degree: number) => Math.cos(d2r(degree));

  const center = 12;
  const width = 4;

  const f = (x: number) => 65.8656 * Math.pow(1.2035, x) - 60.8656; // f(0) = 5, f(7) = 180, f(10) ≈ 359
  const angle = f(score);

  const radius = center - width / 2;
  const start = [center, width / 2];
  const end = [center + radius * sin(angle), center - radius * cos(angle)];
  const largeArcFlag = angle > 180 ? 1 : 0;

  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
      <circle
        cx={center}
        cy={center}
        r={radius}
        className="stroke-daw-main-300"
        strokeWidth={width}
      />
      <path
        className={score >= 7 ? "stroke-green" : "stroke-yellow"}
        strokeWidth={width}
        strokeLinecap="round"
        d={`M ${start[0]} ${start[1]} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end[0]} ${end[1]}`}
      />
    </svg>
  );
}
