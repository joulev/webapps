const radii = [100, 200, 350, 550, 800, 1100, 1450, 1850];
const angles = Array.from({ length: 8 }, () => Math.floor(Math.random() * 360));

const smallR = 12;

function Circle({ index, opacity }: { index: number; opacity: number }) {
  const radius = radii[index];
  const angle = angles[index];

  const rad = (angle / 180) * Math.PI;
  const x = radius * Math.cos(rad);
  const y = -radius * Math.sin(rad);

  return (
    <g className="animate-fadein" style={{ animationDelay: `${index * 75}ms` }}>
      <circle opacity={opacity} r={radius} className="stroke-main-500 stroke-1 fill-none" />
      <circle cx={x} cy={y} r={smallR - 1} className="stroke-main-500 stroke-1 fill-daw-main-50">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0"
          to="360"
          dur={`${radius * 0.08}s`}
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
}

export default function Circles() {
  const size = Math.max(...radii) * 2 + smallR * 2;
  const viewBox = `${-size / 2} ${-size / 2} ${size} ${size}`;
  return (
    <svg width={size} height={size} viewBox={viewBox}>
      {radii.map((_, i) => (
        <Circle key={i} index={i} opacity={2 / (i + 2)} />
      ))}
    </svg>
  );
}
