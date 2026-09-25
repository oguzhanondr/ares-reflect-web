import { Crosshair, MapTrifold, SquaresFour } from "@phosphor-icons/react"

import { Panel, Reveal, Section, SubHeading } from "@/components/section"

const LAYERS = [
  {
    no: "01",
    icon: <Crosshair weight="bold" />,
    title: "Stabilizasyon",
    text: "EKF destekli çift çevrimli (kaskad) kontrol, 10 sn periyotlu ±8° Roll/Pitch sarsıntısını anten yönelimine ulaşmadan bastırır.",
    facts: [
      ["Dış döngü", "PI · konum"],
      ["İç döngü", "PID · hız"],
      ["Kilit hatası", "< 0,5°"],
      ["Yeniden kilit", "< 8 sn"],
    ],
  },
  {
    no: "02",
    icon: <SquaresFour weight="bold" />,
    title: "Akıllı yüzey · IRS",
    text: "8×8 elemanlı panel, varaktör diyotlarla faz kaydırarak yansıyan sinyali motor kullanmadan enkazın etrafından depremzedeye yönlendirir.",
    facts: [
      ["Eleman", "8 × 8"],
      ["Bant", "S-band 2 GHz"],
      ["Kazanç", "+7,5 dB"],
      ["Standart", "3GPP R17/18"],
    ],
  },
  {
    no: "03",
    icon: <MapTrifold weight="bold" />,
    title: "Karar destek",
    text: "OpenStreetMap bina verisi üzerinde terminal ve IRS konumlarını birlikte hesaplar. Deterministiktir, internet olmadan çalışır.",
    facts: [
      ["Kümeleme", "K-Means"],
      ["Test", "LoS / NLoS"],
      ["Çıktı", "Terminal + IRS"],
      ["Çalışma", "Yerel"],
    ],
  },
]

const CHAIN = [
  ["Saha verisi", "GPS, OSM bina geometrisi, enkaz ve hedef düğümleri"],
  ["Hedef yönelimi", "Türksat 4B / 5A için yönelim hesabı"],
  ["Stabilizasyon", "EKF ve kaskad PID ile IMU / enkoder geri beslemesi"],
  ["IRS yerleşimi", "İki bacaklı LoS testi ve bileşik kalite skoru"],
  ["Operasyon", "Manuel / otomatik kontrol, telemetri ve acil durdurma"],
]

export function System() {
  return (
    <Section
      id="sistem"
      code="02 / Sistem"
      title="Üç katman, tek siber-fiziksel sistem"
      description="Mevcut çözümlerde ayrı ayrı ele alınan üç problem (hareketli platformda yönelim, NLoS aşımı ve sahada doğru kurulum) ARES-Reflect'te birlikte çözülür."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {LAYERS.map((l, i) => (
          <Reveal key={l.no} delay={i * 0.06}>
            <Panel title={l.title} icon={l.icon} meta={l.no} className="h-full">
              <div className="p-5">
                <p className="text-sm leading-relaxed text-muted-foreground">{l.text}</p>
                <dl className="mt-5 grid grid-cols-2 gap-px border border-border bg-border">
                  {l.facts.map(([k, v]) => (
                    <div key={k} className="bg-card p-3">
                      <dt className="label-mono text-[0.5rem] text-muted-foreground">{k}</dt>
                      <dd className="mt-1 font-mono text-sm text-primary">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <SubHeading no="04">Görev zinciri</SubHeading>
        <dl>
          {CHAIN.map(([k, v]) => (
            <div key={k} className="grid gap-1 border-b border-border py-3.5 sm:grid-cols-[14rem_1fr] sm:gap-6">
              <dt className="text-[0.7rem] font-bold tracking-[0.12em] uppercase">{k}</dt>
              <dd className="text-sm text-muted-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  )
}
