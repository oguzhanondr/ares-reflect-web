import terminalPrototype from "@/assets/terminal-prototype.png"
import { Corners, DataCell, Reveal, Section, SubHeading } from "@/components/section"
import { HARDWARE, SAFETY } from "@/lib/content"

const FIGURES = [
  { label: "Toplam ağırlık", value: "~15 kg", note: "Sınır 20 kg" },
  { label: "Nominal güç", value: "~100 W", note: "Uydu takibinde" },
  { label: "Tepe güç", value: "~124 W", note: "±8° sarsıntıda · sınır 140 W" },
  { label: "Efektif tork", value: "6,0 Nm", note: "3:1 kayış-kasnak aktarımı" },
]

export function Hardware() {
  return (
    <Section
      id="donanim"
      code="04 / Donanım"
      title="Güncel donanım yapılandırması"
      description="Alüminyum 6061-T6 taşıyıcı iskelet ve PETG muhafazalar. Ağırlık merkezi azimut ve elevasyon eksenlerinin kesişimine hizalandığı için motorlar yükü taşımaz, yalnızca sarsıntıyı bastırır."
    >
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <figure className="relative flex h-full flex-col border border-border bg-panel p-3">
            <img
              src={terminalPrototype}
              alt="Beyaz fonda ARES-Reflect terminal prototipi: alüminyum muhafaza, hareket mekanizması ve parabolik anten"
              width={1086}
              height={1448}
              loading="lazy"
              className="block h-auto w-full"
            />
            <figcaption className="mt-3">
              <p className="font-mono text-[0.6rem] tracking-[0.2em] text-primary uppercase">Terminal prototipi</p>
              <p className="mt-1 font-mono text-[0.65rem] text-muted-foreground">40 cm parabolik anten · S-band 2 GHz</p>
            </figcaption>
            <Corners />
          </figure>
        </Reveal>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {HARDWARE.map((h, i) => (
            <Reveal key={h.name} delay={i * 0.03} className={i === HARDWARE.length - 1 ? "sm:col-span-2" : undefined}>
              <DataCell label={h.group} value={h.name} note={h.spec} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {FIGURES.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.04}>
            <DataCell label={f.label} value={<span className="text-2xl">{f.value}</span>} note={f.note} className="h-full" />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <SubHeading no="01">Güvenlik katmanları</SubHeading>
        <ol className="grid sm:grid-cols-3">
          {SAFETY.map((s) => (
            <li key={s.id} className="flex items-baseline gap-3 border-b border-border py-3 sm:pr-4">
              <span className="font-mono text-[0.65rem] text-primary">{s.id}</span>
              <span className="text-[0.75rem] font-bold tracking-[0.08em] uppercase">{s.guard}</span>
              <span className="ml-auto text-xs text-muted-foreground">{s.threat}</span>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  )
}
