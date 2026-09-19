// Particle density: 108 emitters, with only a portion visible at a given moment.
const PARTICLES_PER_WAVE = 54;

// These cubic control points match the existing paths for waves 3 and 4.
// S commands reflect the previous control point to form the next segment.
const particleCurves = [
  { wave: 3, delay: '-11s', segments: [
    [[-480, 470], [-130, 310], [170, 350], [450, 450]],
    [[450, 450], [730, 550], [880, 545], [1170, 420]],
    [[1170, 420], [1460, 295], [1650, 280], [1920, 390]],
  ] },
  { wave: 4, delay: '-37s', segments: [
    [[-480, 370], [-100, 260], [170, 420], [480, 470]],
    [[480, 470], [790, 520], [900, 400], [1220, 455]],
    [[1220, 455], [1540, 510], [1660, 510], [1920, 310]],
  ] },
];

// Deterministic variation: computed once, with no animation loop or React state.
const variation = (seed) => {
  const value = Math.sin(seed * 127.1) * 43758.5453;
  return value - Math.floor(value);
};

const pointOnCurve = (segments, progress) => {
  const segment = Math.floor(progress);
  const t = progress - segment;
  const u = 1 - t;
  return [0, 1].map((axis) => {
    const [a, b, c, d] = segments[segment];
    return u ** 3 * a[axis] + 3 * u ** 2 * t * b[axis]
      + 3 * u * t ** 2 * c[axis] + t ** 3 * d[axis];
  });
};

const particleFields = particleCurves.map((curve) => ({
  ...curve,
  particles: Array.from({ length: PARTICLES_PER_WAVE }, (_, index) => {
    const seed = index + curve.wave * 100;
    // Favor faint dust, with a smaller number of bright silver highlights.
    const brightness = variation(seed + 6) ** 1.5;
    const [x, y] = pointOnCurve(curve.segments, 0.6 + variation(seed) * 1.7);
    return {
      x, y,
      radius: index % 3 === 0
        ? 0.5 + variation(seed + 1) * 0.35
        : 0.65 + variation(seed + 1) * 0.85,
      distant: index % 3 === 0,
      glow: brightness > 0.8 && index % 3 !== 0,
      style: {
        '--dust-duration': `${5 + variation(seed + 2) * 7}s`,
        '--dust-delay': `${-variation(seed + 3) * 24}s`,
        '--dust-x': `${(variation(seed + 4) - 0.5) * 96}px`,
        '--dust-y': `${(variation(seed + 5) < 0.65 ? -1 : 1) * (35 + variation(seed + 8) * 55)}px`,
        '--dust-opacity': 0.18 + brightness * 0.82,
        '--dust-scale': 0.7 + variation(seed + 7) * 0.65,
      },
    };
  }),
}));

const XmbBackground = () => (
  <svg
    className="xmb-background"
    viewBox="0 0 1440 700"
    preserveAspectRatio="none"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    {/* Curves extend well past both edges to keep their ends out of view. */}
    <path
      className="xmb-wave xmb-wave-1"
      d="M-480 490 C-120 260 140 290 430 435 S890 595 1190 390 S1660 270 1920 420"
    />
    <path
      className="xmb-wave xmb-wave-2"
      d="M-480 420 C-100 560 170 260 470 405 S890 560 1190 410 S1650 320 1920 460"
    />
    <path
      className="xmb-wave xmb-wave-3"
      d="M-480 470 C-130 310 170 350 450 450 S880 545 1170 420 S1650 280 1920 390"
    />
    <path
      className="xmb-wave xmb-wave-4"
      d="M-480 370 C-100 260 170 420 480 470 S900 400 1220 455 S1660 510 1920 310"
    />
    <path
      className="xmb-wave xmb-wave-5"
      d="M-480 540 C-150 460 160 315 470 420 S900 575 1210 435 S1660 360 1920 490"
    />

    {particleFields.map(({ wave, delay, particles }) => (
      <g key={wave} className="xmb-particle-field" style={{
        '--wave-duration': `var(--wave-duration-${wave})`,
        '--wave-delay': delay,
      }}>
        {[true, false].map((distant) => (
          <g key={String(distant)} className={distant ? 'xmb-dust-back' : 'xmb-dust-front'}>
            {particles.map((particle, index) => particle.distant === distant && (
              <g key={index} transform={`translate(${particle.x} ${particle.y})`}>
                <g className="xmb-dust" style={particle.style}>
                  {particle.glow && <circle className="xmb-dust-glow" r={particle.radius * 2.2} />}
                  <circle r={particle.radius} />
                </g>
              </g>
            ))}
          </g>
        ))}
      </g>
    ))}
  </svg>
);

export default XmbBackground
