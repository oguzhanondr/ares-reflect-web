import { ArrowDown } from "@phosphor-icons/react"
import { motion } from "motion/react"

import { HeroScene } from "@/components/hero-scene"
import { Corners, Panel } from "@/components/section"
import { Button } from "@/components/ui/button"
import { NumberTicker } from "@/components/ui/number-ticker"
import { HERO_STATS } from "@/lib/content"

export function Hero() {
  return (
    <section id="genel" className="px-4 pt-10 pb-16 sm:px-8 md:pt-12">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="border-b border-border pb-6"
        >
          <p className="font-mono text-[0.65rem] tracking-[0.2em] text-primary uppercase">00 / Proje dosyası</p>
          <h1 className="mt-2 text-4xl font-bold tracking-[0.06em] uppercase sm:text-5xl">ARES-Reflect</h1>
          <p className="mt-2 text-sm text-muted-foreground">Hareketli uydu terminali ve IRS destekli afet haberleşme sistemi.</p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mt-8 grid border border-border bg-panel lg:grid-cols-[1fr_1.05fr]"
        >
          <div className="flex flex-col p-6 sm:p-8">
            <div className="flex gap-6">
              <div className="hidden shrink-0 border-r border-border pr-6 sm:block">
                <p className="text-lg tracking-[0.06em] text-muted-foreground">PATH</p>
                <p className="text-4xl font-bold text-primary">2026</p>
              </div>
              <div>
                <p className="font-mono text-[0.6rem] tracking-[0.2em] text-primary uppercase">Temel sistem özeti</p>
                <p className="mt-3 text-2xl leading-tight font-bold tracking-[0.04em] uppercase sm:text-[1.9rem]">
                  Enkazın ardında da bir hayat koridoru.
                </p>
              </div>
            </div>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-muted-foreground">
              Deprem ve sel gibi afetlerden sonra karasal haberleşme çöker, ayakta kalan binalar ve enkaz da uydu
              sinyalini keser. ARES-Reflect bu sorunu üç katmanda çözer: sarsıntı altında uyduya kilitli kalan
              hareketli terminal, sinyali enkazın etrafından büken 8×8 akıllı yüzey (IRS) ve ikisini sahada nereye
              kuracağınızı hesaplayan karar destek yazılımı.
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
              Hedef geniş bant değil, akıllı telefonların 3GPP Rel-17/18 NTN ile doğrudan uyduya ulaşabildiği dar
              bantlı bir kanal: <span className="text-foreground">SOS, SMS ve GPS</span>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
              <Button asChild className="h-10 px-5 text-xs font-bold tracking-[0.12em] uppercase">
                <a href="#sorun">
                  Sistemi incele <ArrowDown data-icon="inline-end" />
                </a>
              </Button>
              <Button asChild variant="outline" className="h-10 border-line2 bg-card px-5 text-xs font-bold tracking-[0.12em] uppercase">
                <a href="#takim">Takım</a>
              </Button>
            </div>
          </div>

          <div className="border-t border-border p-3 sm:p-4 lg:border-t-0 lg:border-l">
            <Panel
              title="Saha · NLoS senaryosu"
              meta={
                <span className="flex items-center gap-1.5 text-ok">
                  <span className="blink size-1.5 rounded-full bg-ok" /> Kilitli
                </span>
              }
              className="bg-background"
            >
              <div className="p-3 sm:p-4">
                <HeroScene />
              </div>
              <div className="grid grid-cols-3 border-t border-border font-mono text-[0.6rem] tracking-wider text-muted-foreground uppercase sm:text-[0.65rem]">
                <Legend color="bg-primary" label="Uydu kilidi" />
                <Legend color="bg-signal" label="IRS rölesi" />
                <Legend color="bg-blocked" label="Engelli hat" />
              </div>
            </Panel>
          </div>
          <Corners />
        </motion.div>

        <dl className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {HERO_STATS.map((s, i) => (
            <div key={s.label} className="border border-border bg-card p-4 sm:p-5">
              <dt className="label-mono text-[0.55rem] text-muted-foreground">{s.label}</dt>
              <dd className="mt-2 font-mono text-3xl text-primary sm:text-4xl">
                {s.prefix}
                <NumberTicker value={s.value} decimalPlaces={s.decimals} delay={0.2 + i * 0.1} className="tracking-normal text-primary dark:text-primary" />
                <span className="ml-1 text-lg">{s.unit}</span>
              </dd>
              <dd className="mt-1 font-mono text-[0.7rem] text-muted-foreground">{s.note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-border">
      <span className={`h-0.5 w-4 shrink-0 ${color}`} />
      {label}
    </div>
  )
}
