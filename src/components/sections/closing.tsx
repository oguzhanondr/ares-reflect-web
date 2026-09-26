import { LinkedinLogo } from "@phosphor-icons/react"
import logo from "@/assets/ares-reflect-logo.png"
import { Reveal, Section } from "@/components/section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { REFERENCES, TEAM } from "@/lib/content"
import { cn } from "@/lib/utils"

export function Team() {
  return (
    <Section
      id="takim"
      code="05 / PATH · TEKNOFEST"
      title="Takım tanıtımı"
      description="Elektrik-elektronik, makine ve yapay zekâ mühendisliği öğrencilerinden oluşan takım, Manisa Celal Bayar Üniversitesi öğretim üyesi danışmanlığında çalışıyor."
    >
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.04}>
            <article className={cn("h-full border bg-card p-5", i === 0 ? "border-primary/50" : "border-border")}>
              <p className="font-mono text-[0.55rem] tracking-[0.2em] text-primary uppercase">{m.role}</p>
              <h3 className="mt-2 text-[0.9rem] font-bold tracking-[0.06em] uppercase">{m.name}</h3>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3">
                <p className="font-mono text-[0.6rem] text-muted-foreground">{m.dept}</p>
                {m.linkedin ? (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} LinkedIn profili`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    <LinkedinLogo size={18} weight="fill" />
                  </a>
                ) : (
                  <span className="text-muted-foreground" aria-hidden>
                    <LinkedinLogo size={18} weight="fill" />
                  </span>
                )}
              </div>
            </article>
          </Reveal>
        ))}
        <Reveal delay={0.3}>
          <div className="flex h-full flex-col justify-center border border-dashed border-line2 p-5">
            <p className="label-mono text-[0.55rem] text-muted-foreground">Takım ID</p>
            <p className="mt-1 font-mono text-2xl text-primary">815048</p>
            <p className="mt-4 label-mono text-[0.55rem] text-muted-foreground">Kategori</p>
            <p className="mt-1 text-[0.75rem] font-bold tracking-[0.06em] uppercase">Hareketli Uydu Terminali</p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-panel px-4 py-12 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.3fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="size-11 rounded-[9px] object-cover" width={44} height={44} />
            <div>
              <p className="text-base font-bold tracking-[0.14em]">ARES-REFLECT</p>
              <p className="mt-1 font-mono text-[0.55rem] tracking-[0.2em] text-muted-foreground">TAKIM PATH / TEKNOFEST 2026</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Afet sonrası NLoS ortamında dar bantlı uydu haberleşmesi için stabilize hareketli terminal, akıllı yüzey ve
            karar destek yazılımı.
          </p>
        </div>

        <Accordion type="single" collapsible className="border-t border-border">
          <AccordionItem value="refs">
            <AccordionTrigger className="text-[0.7rem] font-bold tracking-[0.2em] uppercase">Kaynakça</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal space-y-2 pl-5 text-xs leading-relaxed text-muted-foreground">
                {REFERENCES.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="note">
            <AccordionTrigger className="text-[0.7rem] font-bold tracking-[0.2em] uppercase">Doğrulama notu</AccordionTrigger>
            <AccordionContent>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Stabilizasyon ve RF sonuçları MATLAB/Simulink dijital ikizi ve link bütçesi simülasyonlarından
                alınmıştır. Yarışma şartnamesi gereği RF performansı değerlendirilmez; sistem doğrulaması lazer boresight
                yöntemiyle yapılır.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-between gap-3 border-t border-border pt-5 font-mono text-[0.65rem] tracking-[0.1em] text-muted-foreground uppercase">
        <span>© 2026 Takım PATH · ARES-Reflect</span>
        <a href="#genel" className="hover:text-primary">
          Başa dön ↑
        </a>
      </div>
    </footer>
  )
}
