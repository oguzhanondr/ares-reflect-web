import { Buildings, CellTower, ChartBar, Lightning } from "@phosphor-icons/react"

import { Panel, Reveal, Section } from "@/components/section"
import { LINK } from "@/lib/content"

const pct = (v: number) => ((v - LINK.min) / (LINK.max - LINK.min)) * 100

const PROBLEMS = [
  {
    icon: CellTower,
    title: "Karasal ağ çöker",
    text: "Deprem ve sel sonrası baz istasyonları ve fiber omurga devre dışı kalır.",
  },
  {
    icon: Buildings,
    title: "Enkaz görüş hattını keser",
    text: "Ayakta kalan binalar ve enkaz blokları uydu sinyalini haberleşme eşiğinin altına düşürür (NLoS).",
  },
  {
    icon: Lightning,
    title: "Alternatifler enerji ister",
    text: "HAPS ve İHA çözümleri yüksek güç ve lojistik gerektirir. IRS ise pasif, hafif ve düşük maliyetlidir.",
  },
]

const BARS = [
  { label: "Enkaz arkasında", value: LINK.blocked, tone: "bg-blocked", status: "Bağlantı yok", statusTone: "text-blocked" },
  { label: "IRS ile", value: LINK.withIrs, tone: "bg-ok", status: "SOS / SMS / GPS", statusTone: "text-ok" },
]

export function Problem() {
  return (
    <Section
      id="sorun"
      code="01 / Sorun"
      title="Afetin ilk saatlerinde tek bir sinyal çubuğu"
      description="Arama-kurtarma ekipleri ve enkaz altındaki afetzedeler için ihtiyaç geniş bant değil; bir SOS, bir SMS, bir GPS koordinatı. ARES-Reflect kopan bağlantıyı asgari haberleşme eşiğinin üzerine taşımayı hedefler."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        <div className="grid gap-2">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="flex h-full gap-4 border border-border bg-card p-5">
                <p.icon className="mt-0.5 size-5 shrink-0 text-primary" weight="bold" />
                <div>
                  <h3 className="text-sm font-bold tracking-[0.08em] uppercase">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <Panel title="Link bütçesi · S-band" icon={<ChartBar weight="bold" />} meta="MATLAB" className="h-full">
            <div className="p-5 sm:p-6">
              <div className="space-y-7">
                {BARS.map((b) => (
                  <div key={b.label}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="label-mono text-muted-foreground">{b.label}</span>
                      <span className="font-mono text-2xl">
                        {b.value.toLocaleString("tr-TR")} <span className="text-xs text-muted-foreground">dBm</span>
                      </span>
                    </div>
                    <div className="relative mt-2 h-6 border border-border bg-background">
                      <div className={`h-full ${b.tone}`} style={{ width: `${pct(b.value)}%` }} />
                      <span className="absolute -inset-y-1.5 w-0.5 bg-foreground" style={{ left: `${pct(LINK.threshold)}%` }} aria-hidden />
                    </div>
                    <p className={`mt-1.5 text-right font-mono text-[0.65rem] tracking-[0.14em] uppercase ${b.statusTone}`}>{b.status}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 border border-border text-center">
                <div className="border-r border-border p-3">
                  <p className="label-mono text-[0.55rem] text-muted-foreground">Eşik</p>
                  <p className="mt-1 font-mono text-sm">−110 dBm</p>
                </div>
                <div className="border-r border-border p-3">
                  <p className="label-mono text-[0.55rem] text-muted-foreground">IRS kazancı</p>
                  <p className="mt-1 font-mono text-sm text-primary">+7,5 dB</p>
                </div>
                <div className="p-3">
                  <p className="label-mono text-[0.55rem] text-muted-foreground">Eşik payı</p>
                  <p className="mt-1 font-mono text-sm text-ok">+3,5 dB</p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Beyaz çizgi −110 dBm haberleşme eşiğidir. Uplink'teki açık, 3GPP NTN tekrarlama protokolü ve IRS'in
                karşılıklılık gereği uplink'te de sağladığı pasif kazançla kapatılır.
              </p>
            </div>
          </Panel>
        </Reveal>
      </div>
    </Section>
  )
}
