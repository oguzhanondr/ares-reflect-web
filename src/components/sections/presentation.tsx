import { useEffect, useRef, useState } from "react"
import { ArrowsOut, CaretLeft, CaretRight, FilePdf } from "@phosphor-icons/react"

import { Reveal, Section } from "@/components/section"
import { cn } from "@/lib/utils"

const SLIDE_COUNT = 20
const SLIDES = Array.from({ length: SLIDE_COUNT }, (_, i) => `/sunum/${String(i + 1).padStart(2, "0")}.webp`)
const PDF = "/cv/ares-reflect-sunum.pdf"

export function Presentation() {
  const [index, setIndex] = useState(0)
  const stage = useRef<HTMLDivElement>(null)
  const thumbs = useRef<HTMLDivElement>(null)
  const touchX = useRef<number | null>(null)

  const go = (i: number) => setIndex(Math.min(SLIDE_COUNT - 1, Math.max(0, i)))

  useEffect(() => {
    thumbs.current?.children[index]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" })
    // warm the cache for the neighbouring slides
    for (const i of [index - 1, index + 1]) if (SLIDES[i]) new Image().src = SLIDES[i]
  }, [index])

  return (
    <Section
      id="sunum"
      code="06 / Sunum"
      title="Final sunumu"
      description="TEKNOFEST 2026 final sunumumuz. Slaytlar arasında oklarla, klavyedeki yön tuşlarıyla ya da mobilde kaydırarak gezinebilirsiniz."
    >
      <Reveal>
        <div
          ref={stage}
          tabIndex={0}
          aria-roledescription="slayt gösterisi"
          aria-label="ARES-Reflect final sunumu"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(index + 1)
            if (e.key === "ArrowLeft") go(index - 1)
          }}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1))
            touchX.current = null
          }}
          className="group relative border border-border bg-panel outline-none focus-visible:border-primary"
        >
          <img
            src={SLIDES[index]}
            alt={`Sunum slaytı ${index + 1} / ${SLIDE_COUNT}`}
            className="aspect-video w-full bg-white object-contain"
            width={1920}
            height={1080}
          />
          <NavButton side="left" disabled={index === 0} onClick={() => go(index - 1)} />
          <NavButton side="right" disabled={index === SLIDE_COUNT - 1} onClick={() => go(index + 1)} />
        </div>
      </Reveal>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs tracking-[0.15em] text-muted-foreground">
          <b className="text-primary">{String(index + 1).padStart(2, "0")}</b> / {SLIDE_COUNT}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => stage.current?.requestFullscreen?.()}
            className="flex h-8 items-center gap-1.5 border border-border px-3 font-mono text-[0.65rem] tracking-[0.15em] uppercase transition hover:border-primary hover:text-primary"
          >
            <ArrowsOut size={14} /> Tam ekran
          </button>
          <a
            href={PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 items-center gap-1.5 rounded-[4px] bg-[#D93025] px-3 font-mono text-[0.65rem] font-bold tracking-[0.15em] text-white uppercase transition hover:bg-[#B3261E]"
          >
            <FilePdf size={14} weight="fill" /> PDF olarak aç
          </a>
        </div>
      </div>

      <div ref={thumbs} className="mt-3 flex gap-2 overflow-x-auto pb-2">
        {SLIDES.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Slayt ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className={cn(
              "w-28 shrink-0 border-2 transition",
              i === index ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <img src={src} alt="" loading="lazy" className="aspect-video w-full bg-white object-cover" width={192} height={108} />
          </button>
        ))}
      </div>
    </Section>
  )
}

function NavButton({ side, disabled, onClick }: { side: "left" | "right"; disabled: boolean; onClick: () => void }) {
  const Icon = side === "left" ? CaretLeft : CaretRight
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === "left" ? "Önceki slayt" : "Sonraki slayt"}
      className={cn(
        "absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 disabled:pointer-events-none disabled:opacity-0 sm:size-12",
        side === "left" ? "left-2 sm:left-3" : "right-2 sm:right-3"
      )}
    >
      <Icon size={22} weight="bold" />
    </button>
  )
}
