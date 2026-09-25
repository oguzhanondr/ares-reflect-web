import { useEffect, useRef, useState } from "react"
import { Bluetooth, Cube, FilePdf, MapTrifold, Planet, ShieldCheck, WifiSlash } from "@phosphor-icons/react"

import controlStation from "@/assets/control-station.webp"

import { Corners, Panel, Reveal, Section, SubHeading } from "@/components/section"
import { PIPELINE } from "@/lib/content"
import { cn } from "@/lib/utils"

// City blocks: [x, y, w, h]
const BLOCKS: [number, number, number, number][] = [
  [20, 20, 150, 90], [200, 20, 170, 90], [400, 20, 180, 90],
  [20, 140, 150, 90], [200, 140, 170, 90], [400, 140, 180, 90],
  [20, 260, 150, 100], [200, 260, 170, 100], [400, 260, 180, 100],
]
// Collapsed areas (debris) — not line-of-sight blockers.
const DEBRIS: [number, number, number, number][] = [
  [400, 140, 180, 90],
  [20, 260, 150, 100],
  [300, 20, 70, 90],
]
const CLUSTERS = [
  { c: [492, 186], r: 40, pts: [[470, 176], [505, 168], [496, 206], [520, 192]] },
  { c: [92, 308], r: 38, pts: [[74, 296], [106, 290], [96, 328]] },
  { c: [334, 70], r: 30, pts: [[330, 54], [348, 80], [318, 82]] },
]
const TERM_CANDIDATES = [[385, 245], [385, 125], [185, 245], [185, 125], [590 - 10, 245], [100, 245], [290, 245], [290, 125]]
const IRS_CANDIDATES = [[540, 260], [400, 70], [190, 60], [185, 330], [450, 110]]
const BLOCKED = [
  { a: [385, 125], b: [190, 60], x: [296, 96] },
  { a: [185, 245], b: [450, 110], x: [240, 217] },
]
const FINAL = [
  { t: [385, 245], irs: [540, 260], to: [492, 186] },
  { t: [185, 245], irs: null, to: [92, 308] },
  { t: [385, 125], irs: [400, 70], to: [334, 70] },
]

const FEATURES = [
  { icon: Bluetooth, title: "Bluetooth SPP", text: "ESP32 ile CRC korumalı çerçeveli protokol" },
  { icon: Planet, title: "Otomatik yönlendirme", text: "Türksat 4B / 5A hedefleri" },
  { icon: Cube, title: "3B SOTM sahnesi", text: "BNO055 verisiyle canlı terminal modeli" },
  { icon: MapTrifold, title: "IRS konumlandırma", text: "OSM bina verisi üzerinde yerleşim" },
  { icon: WifiSlash, title: "Çevrim dışı", text: "Yerleşim motoru ağ olmadan çalışır" },
  { icon: FilePdf, title: "Saha raporu", text: "Sonuçları PDF olarak dışa aktarır" },
]

export function Software() {
  const [step, setStep] = useState(0)
  const [auto, setAuto] = useState(true)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!auto || !visible) return
    const id = setInterval(() => setStep((s) => (s + 1) % PIPELINE.length), 3200)
    return () => clearInterval(id)
  }, [auto, visible])

  const show = (layer: number) => (step >= layer ? 1 : 0)
  const final = step === 3

  return (
    <Section
      id="yazilim"
      code="03 / Yazılım"
      title="Kontrol istasyonu ve karar destek"
      description="Windows masaüstü uygulaması; terminali Bluetooth üzerinden yönetir, telemetriyi izler ve afet sahasında terminal ile IRS panellerinin nereye kurulacağını saha denemesi yapmadan hesaplar."
    >
      <Reveal>
        <figure className="relative border border-border bg-panel p-2">
          <img
            src={controlStation}
            alt="ARES-Reflect Control Station, IRS Konumlandırma ekranı: Elbistan haritasında 12 depremzede ve 4 enkaz için hesaplanan terminaller, IRS adayları ve kalite puanları"
            width={1440}
            height={900}
            loading="lazy"
            className="block h-auto w-full"
          />
          <figcaption className="flex justify-between px-2 pt-2.5 pb-1 font-mono text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase">
            <span>Control Station · IRS konumlandırma, Senaryo 4</span>
            <span className="max-sm:hidden">Windows · Electron</span>
          </figcaption>
          <Corners />
        </figure>
      </Reveal>

      <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.04}>
            <div className="h-full border border-border bg-card p-4">
              <f.icon className="size-5 text-primary" weight="bold" />
              <p className="mt-3 text-[0.7rem] font-bold tracking-[0.1em] uppercase">{f.title}</p>
              <p className="mt-1 text-xs leading-snug text-muted-foreground">{f.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <SubHeading no="01" className="mt-14 mb-6">IRS yerleşim algoritması</SubHeading>
      <div ref={ref} className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <ol className="flex flex-col gap-2">
          {PIPELINE.map((p, i) => (
            <li key={p.step}>
              <button
                type="button"
                onClick={() => {
                  setStep(i)
                  setAuto(false)
                }}
                className={cn(
                  "relative w-full overflow-hidden border p-4 text-left transition-colors",
                  step === i ? "border-primary/60 bg-card" : "border-border hover:bg-card/60"
                )}
                aria-current={step === i ? "step" : undefined}
              >
                <div className="flex items-baseline gap-3">
                  <span className={cn("font-mono text-[0.65rem]", step === i ? "text-primary" : "text-muted-foreground")}>{p.step}</span>
                  <h4 className="text-[0.8rem] font-bold tracking-[0.1em] uppercase">{p.title}</h4>
                </div>
                {step === i && <p className="mt-2 pl-7 text-sm leading-relaxed text-muted-foreground">{p.text}</p>}
                {step === i && auto && visible && (
                  <span key={`bar-${step}`} className="absolute bottom-0 left-0 h-0.5 animate-[grow_3.2s_linear] bg-primary" />
                )}
              </button>
            </li>
          ))}
          <li className="mt-auto flex gap-3 border border-primary/40 bg-primary/[0.05] p-4">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" weight="bold" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-bold text-foreground">Karar yetkisi yerel motorda.</span> Yapay zekâ yalnızca
              sonuçları açıklar; koordinat üretemez, engelli bir adayı geçerli sayamaz.
            </p>
          </li>
        </ol>

        <Panel title="IRS konumlandırma" icon={<MapTrifold weight="bold" />} meta={`Adım ${step + 1}/4`}>
          <div className="p-3 sm:p-4">
            <svg viewBox="0 0 600 380" className="h-auto w-full" role="img" aria-label={`Yerleşim algoritması, adım ${step + 1}: ${PIPELINE[step].title}`}>
              <defs>
                <pattern id="debris" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="7" stroke="var(--blocked)" strokeOpacity="0.35" strokeWidth="2" />
                </pattern>
              </defs>
              {BLOCKS.map(([x, y, w, h], i) => (
                <rect key={i} x={x} y={y} width={w} height={h} fill="var(--secondary)" stroke="var(--input)" />
              ))}
              {DEBRIS.map(([x, y, w, h], i) => (
                <rect key={i} x={x} y={y} width={w} height={h} fill="url(#debris)" stroke="var(--blocked)" strokeOpacity="0.5" strokeDasharray="4 4" />
              ))}

              {/* 1 · clusters */}
              <g style={{ opacity: show(0) }} className="transition-opacity duration-500">
                {CLUSTERS.map((c, i) => (
                  <circle key={i} cx={c.c[0]} cy={c.c[1]} r={c.r} fill="none" stroke="var(--primary)" strokeOpacity="0.7" strokeDasharray="3 4" />
                ))}
              </g>

              {/* 2 · candidates */}
              <g style={{ opacity: show(1) * (final ? 0.25 : 1) }} className="transition-opacity duration-500">
                {TERM_CANDIDATES.map(([x, y], i) => (
                  <rect key={i} x={x - 4} y={y - 4} width="8" height="8" fill="none" stroke="var(--primary)" />
                ))}
                {IRS_CANDIDATES.map(([x, y], i) => (
                  <rect key={i} x={x - 9} y={y - 2.5} width="18" height="5" fill="none" stroke="var(--signal)" />
                ))}
              </g>

              {/* 3 · line-of-sight tests */}
              <g style={{ opacity: show(2) * (final ? 0.35 : 1) }} className="transition-opacity duration-500">
                {BLOCKED.map((b, i) => (
                  <g key={i}>
                    <line x1={b.a[0]} y1={b.a[1]} x2={b.b[0]} y2={b.b[1]} stroke="var(--blocked)" strokeWidth="1.5" strokeDasharray="5 4" />
                    <g stroke="var(--blocked)" strokeWidth="2.5">
                      <line x1={b.x[0] - 6} y1={b.x[1] - 6} x2={b.x[0] + 6} y2={b.x[1] + 6} />
                      <line x1={b.x[0] + 6} y1={b.x[1] - 6} x2={b.x[0] - 6} y2={b.x[1] + 6} />
                    </g>
                  </g>
                ))}
              </g>

              {/* 3+4 · valid links */}
              <g style={{ opacity: show(2) }} className="transition-opacity duration-500">
                {FINAL.map((f, i) => {
                  const d = f.irs
                    ? `M${f.t[0]} ${f.t[1]} L${f.irs[0]} ${f.irs[1]} L${f.to[0]} ${f.to[1]}`
                    : `M${f.t[0]} ${f.t[1]} L${f.to[0]} ${f.to[1]}`
                  return <path key={i} d={d} fill="none" stroke="var(--signal)" strokeWidth={final ? 2.5 : 1.5} strokeDasharray="6 6" className="dash-flow" />
                })}
              </g>

              {/* survivors */}
              {CLUSTERS.flatMap((c) => c.pts).map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="4.5" fill="var(--primary)" stroke="var(--background)" strokeWidth="1.5" />
              ))}

              {/* 4 · selected */}
              <g style={{ opacity: final ? 1 : 0 }} className="transition-opacity duration-500">
                {FINAL.map((f, i) => (
                  <g key={i}>
                    <rect x={f.t[0] - 8} y={f.t[1] - 8} width="16" height="16" fill="var(--primary)" />
                    <rect x={f.t[0] - 3} y={f.t[1] - 3} width="6" height="6" fill="var(--background)" />
                    {f.irs && <rect x={f.irs[0] - 12} y={f.irs[1] - 4} width="24" height="8" fill="var(--signal)" />}
                  </g>
                ))}
                <text x="398" y="232" className="fill-muted-foreground font-mono text-[10px]">T1</text>
                <text x="198" y="232" className="fill-muted-foreground font-mono text-[10px]">T2</text>
                <text x="370" y="148" className="fill-muted-foreground font-mono text-[10px]">T3</text>
              </g>
            </svg>
          </div>
          <div className="grid grid-cols-2 border-t border-border font-mono text-[0.65rem] text-muted-foreground sm:grid-cols-4">
            <Key swatch={<span className="size-2.5 rounded-full bg-primary" />} label="Depremzede" />
            <Key swatch={<span className="size-2.5 border border-blocked bg-[repeating-linear-gradient(45deg,var(--blocked)_0_1px,transparent_1px_4px)]" />} label="Enkaz" />
            <Key swatch={<span className="h-1.5 w-4 bg-signal" />} label="IRS / açık hat" />
            <Key swatch={<span className="h-0.5 w-4 border-t border-dashed border-blocked" />} label="Engelli hat" />
          </div>
        </Panel>
      </div>

    </Section>
  )
}

function Key({ swatch, label }: { swatch: React.ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-2 border-border px-3 py-2.5 max-sm:odd:border-r max-sm:[&:nth-child(-n+2)]:border-b sm:[&:not(:last-child)]:border-r">
      {swatch}
      {label}
    </span>
  )
}
