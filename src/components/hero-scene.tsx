// Schematic of the ARES-Reflect field scenario: the terminal stays locked on
// the satellite, the direct satellite → survivor path is blocked by an intact
// building (NLoS), and an IRS panel relays the narrowband signal around it.

const SAT = { x: 480, y: 58 }
const TERM = { x: 95, y: 350 }
const IRS = { x: 303, y: 190 }
const SURV = { x: 340, y: 374 }
const BLOCK = { x: 425, y: 180 }

const pathTermSat = `M${TERM.x} ${TERM.y} L${SAT.x} ${SAT.y}`
const pathRelay = `M${TERM.x} ${TERM.y} L${IRS.x} ${IRS.y} L${SURV.x} ${SURV.y}`

export function HeroScene() {
  return (
    <svg
      viewBox="0 0 560 430"
      className="h-auto w-full"
      role="img"
      aria-label="Terminal uyduya kilitli; uydudan depremzedeye doğrudan hat sağlam bir binaya çarpıyor, IRS paneli sinyali enkazın etrafından depremzedeye yönlendiriyor."
    >
      <defs>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--border)" strokeWidth="2" />
        </pattern>
        <radialGradient id="survGlow">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* orbit arcs */}
      <g fill="none" stroke="var(--border)" strokeWidth="1">
        <circle cx={TERM.x} cy={TERM.y} r="220" strokeDasharray="2 6" />
        <circle cx={TERM.x} cy={TERM.y} r="420" />
      </g>

      {/* background skyline */}
      <g fill="var(--muted)" opacity="0.55">
        <rect x="18" y="300" width="40" height="100" />
        <rect x="200" y="280" width="50" height="120" />
        <rect x="455" y="250" width="45" height="150" />
        <rect x="505" y="300" width="40" height="100" />
      </g>

      {/* intact buildings */}
      <g fill="var(--secondary)" stroke="var(--input)" strokeWidth="1">
        <rect x="160" y="330" width="60" height="70" />
        <rect x="265" y="230" width="40" height="170" />
        <rect x="380" y="180" width="60" height="220" />
      </g>
      <g fill="var(--muted-foreground)" opacity="0.25">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={`w1-${i}`} x={390 + (i % 2) * 24} y={196 + Math.floor(i / 2) * 28} width="14" height="8" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`w2-${i}`} x="278" y={248 + i * 28} width="14" height="8" />
        ))}
      </g>

      {/* debris field */}
      <rect x="312" y="352" width="62" height="48" fill="url(#hatch)" />
      <g fill="var(--input)">
        <rect x="316" y="378" width="22" height="14" transform="rotate(-18 327 385)" />
        <rect x="350" y="372" width="20" height="16" transform="rotate(24 360 380)" />
        <rect x="334" y="390" width="26" height="8" transform="rotate(6 347 394)" />
      </g>

      {/* ground */}
      <line x1="0" y1="400" x2="560" y2="400" stroke="var(--input)" strokeWidth="1.5" />

      {/* blocked direct path */}
      <line x1={SAT.x} y1={SAT.y} x2={BLOCK.x} y2={BLOCK.y} stroke="var(--blocked)" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.9" />
      <line x1={BLOCK.x} y1={BLOCK.y} x2={SURV.x} y2={SURV.y} stroke="var(--blocked)" strokeWidth="1" strokeDasharray="2 6" opacity="0.35" />
      <g stroke="var(--blocked)" strokeWidth="2.5" strokeLinecap="square">
        <line x1={BLOCK.x - 7} y1={BLOCK.y - 7} x2={BLOCK.x + 7} y2={BLOCK.y + 7} />
        <line x1={BLOCK.x + 7} y1={BLOCK.y - 7} x2={BLOCK.x - 7} y2={BLOCK.y + 7} />
      </g>
      <text x={BLOCK.x + 14} y={BLOCK.y - 8} className="fill-blocked font-mono text-[10px] tracking-widest">
        NLoS
      </text>

      {/* terminal ↔ satellite lock */}
      <path d={pathTermSat} stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="8 12" fill="none" className="dash-flow" />
      {/* relay via IRS */}
      <path d={pathRelay} stroke="var(--signal)" strokeWidth="2" strokeDasharray="6 8" fill="none" className="dash-flow" />

      {/* signal pulses */}
      <circle r="3.5" fill="var(--primary)">
        <animateMotion dur="2.6s" repeatCount="indefinite" path={`M${SAT.x} ${SAT.y} L${TERM.x} ${TERM.y}`} />
      </circle>
      <circle r="3.5" fill="var(--signal)">
        <animateMotion dur="2.2s" begin="1.2s" repeatCount="indefinite" path={pathRelay} />
      </circle>

      {/* IRS panel on roof mast */}
      <line x1={IRS.x} y1="230" x2={IRS.x} y2={IRS.y + 4} stroke="var(--muted-foreground)" strokeWidth="1.5" />
      <g transform={`rotate(-20 ${IRS.x} ${IRS.y})`}>
        <rect x={IRS.x - 16} y={IRS.y - 4} width="32" height="8" fill="var(--signal)" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect
            key={i}
            x={IRS.x - 15 + i * 4}
            y={IRS.y - 2.5}
            width="2.4"
            height="5"
            fill="var(--background)"
            className="blink"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </g>
      <text x={IRS.x - 58} y={IRS.y - 18} className="fill-signal font-mono text-[10px] tracking-widest">
        IRS 8×8
      </text>

      {/* survivor */}
      <circle cx={SURV.x} cy={SURV.y} r="26" fill="url(#survGlow)" />
      <circle cx={SURV.x} cy={SURV.y} r="5" fill="var(--primary)" />
      <circle cx={SURV.x} cy={SURV.y} r="5" fill="none" stroke="var(--primary)" strokeWidth="1.5">
        <animate attributeName="r" values="5;20" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <text x={SURV.x + 4} y="420" textAnchor="middle" className="fill-muted-foreground font-mono text-[10px] tracking-widest">
        DEPREMZEDE · SOS
      </text>

      {/* terminal on vehicle */}
      <g>
        <rect x="58" y="362" width="78" height="26" fill="var(--secondary)" stroke="var(--input)" />
        <rect x="116" y="368" width="14" height="10" fill="var(--muted)" />
        <circle cx="76" cy="392" r="7" fill="var(--background)" stroke="var(--muted-foreground)" strokeWidth="2" />
        <circle cx="120" cy="392" r="7" fill="var(--background)" stroke="var(--muted-foreground)" strokeWidth="2" />
        <line x1={TERM.x} y1="362" x2={TERM.x} y2={TERM.y + 4} stroke="var(--muted-foreground)" strokeWidth="3" />
        <g transform={`rotate(-37 ${TERM.x} ${TERM.y})`}>
          <path
            d={`M${TERM.x - 4} ${TERM.y - 17} Q${TERM.x + 9} ${TERM.y} ${TERM.x - 4} ${TERM.y + 17}`}
            fill="none"
            stroke="var(--foreground)"
            strokeWidth="4"
          />
          <line x1={TERM.x + 1} y1={TERM.y} x2={TERM.x + 18} y2={TERM.y} stroke="var(--foreground)" strokeWidth="1.5" />
          <circle cx={TERM.x + 18} cy={TERM.y} r="2.5" fill="var(--primary)" />
        </g>
      </g>
      <text x="58" y="420" className="fill-primary font-mono text-[10px] tracking-widest">
        ARES TERMİNAL
      </text>

      {/* satellite */}
      <g transform={`rotate(-26 ${SAT.x} ${SAT.y})`}>
        <rect x={SAT.x - 52} y={SAT.y - 8} width="36" height="16" fill="none" stroke="var(--foreground)" strokeWidth="1.5" />
        <rect x={SAT.x + 16} y={SAT.y - 8} width="36" height="16" fill="none" stroke="var(--foreground)" strokeWidth="1.5" />
        <line x1={SAT.x - 34} y1={SAT.y - 8} x2={SAT.x - 34} y2={SAT.y + 8} stroke="var(--foreground)" />
        <line x1={SAT.x + 34} y1={SAT.y - 8} x2={SAT.x + 34} y2={SAT.y + 8} stroke="var(--foreground)" />
        <rect x={SAT.x - 12} y={SAT.y - 12} width="24" height="24" fill="var(--foreground)" />
      </g>
      <text x={SAT.x + 30} y={SAT.y + 40} textAnchor="middle" className="fill-muted-foreground font-mono text-[10px] tracking-widest">
        UYDU · S-BAND
      </text>
    </svg>
  )
}
