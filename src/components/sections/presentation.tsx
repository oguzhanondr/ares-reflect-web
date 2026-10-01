import { useEffect, useRef, useState } from "react"
import { CaretLeft, CaretRight, FilePdf, PresentationChart, X } from "@phosphor-icons/react"

import { Reveal, Section } from "@/components/section"
import { cn } from "@/lib/utils"

const SLIDE_COUNT = 20
const SLIDES = Array.from({ length: SLIDE_COUNT }, (_, i) => `/sunum/${String(i + 1).padStart(2, "0")}.webp`)
const PDF = "/cv/ares-reflect-sunum.pdf"

export function Presentation() {
  const [open, setOpen] = useState(false)

  return (
    <Section
      id="sunum"
      code="06 / Sunum"
      title="Final sunumu"
      description="TEKNOFEST 2026 final sunumumuzu sayfadan ayrılmadan slayt slayt inceleyebilir ya da PDF olarak açabilirsiniz."
    >
      <Reveal>
        <div className="flex flex-col gap-5 border border-primary/50 bg-card p-6 sm:flex-row sm:items-center">
          <PresentationChart size={44} weight="fill" className="shrink-0 text-primary" />
          <div className="flex-1">
            <p className="text-[0.95rem] font-bold tracking-[0.06em] uppercase">ARES-Reflect · Final sunumu</p>
            <p className="mt-1 font-mono text-[0.65rem] tracking-[0.12em] text-muted-foreground uppercase">
              {SLIDE_COUNT} slayt · PATH · TEKNOFEST 2026
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-11 items-center gap-2 rounded-[4px] bg-primary px-5 text-[0.8rem] font-bold tracking-[0.15em] text-primary-foreground uppercase transition hover:brightness-110"
            >
              <PresentationChart size={18} weight="fill" /> Sunumu gör
            </button>
            <a
              href={PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center gap-2 rounded-[4px] bg-[#D93025] px-5 text-[0.8rem] font-bold tracking-[0.15em] text-white uppercase transition hover:bg-[#B3261E]"
            >
              <FilePdf size={18} weight="fill" /> PDF
            </a>
          </div>
        </div>
      </Reveal>

      {open && <SlideViewer onClose={() => setOpen(false)} />}
    </Section>
  )
}

function SlideViewer({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0)
  const thumbs = useRef<HTMLDivElement>(null)
  const touchX = useRef<number | null>(null)

  const go = (i: number) => setIndex(Math.min(SLIDE_COUNT - 1, Math.max(0, i)))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") setIndex((i) => Math.min(SLIDE_COUNT - 1, i + 1))
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1))
    }
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  useEffect(() => {
    thumbs.current?.children[index]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" })
    // warm the cache for the neighbouring slides
    for (const i of [index - 1, index + 1]) if (SLIDES[i]) new Image().src = SLIDES[i]
  }, [index])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="ARES-Reflect final sunumu"
      className="fixed inset-0 z-50 flex flex-col bg-black/95 p-3 sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between pb-3 text-white">
        <span className="font-mono text-xs tracking-[0.15em]">
          <b className="text-primary">{String(index + 1).padStart(2, "0")}</b> / {SLIDE_COUNT}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Sunumu kapat"
          className="flex size-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/25"
        >
          <X size={20} weight="bold" />
        </button>
      </div>

      <div
        className="relative mx-auto flex min-h-0 w-full max-w-6xl flex-1 items-center justify-center"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1))
          touchX.current = null
        }}
      >
        <img
          src={SLIDES[index]}
          alt={`Sunum slaytı ${index + 1} / ${SLIDE_COUNT}`}
          className="max-h-full max-w-full bg-white object-contain"
          width={1920}
          height={1080}
        />
        <NavButton side="left" disabled={index === 0} onClick={() => go(index - 1)} />
        <NavButton side="right" disabled={index === SLIDE_COUNT - 1} onClick={() => go(index + 1)} />
      </div>

      <div ref={thumbs} className="mx-auto mt-3 flex w-full max-w-6xl gap-2 overflow-x-auto pb-1">
        {SLIDES.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Slayt ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className={cn(
              "w-24 shrink-0 border-2 transition sm:w-28",
              i === index ? "border-primary" : "border-transparent opacity-50 hover:opacity-100"
            )}
          >
            <img src={src} alt="" loading="lazy" className="aspect-video w-full bg-white object-cover" width={192} height={108} />
          </button>
        ))}
      </div>
    </div>
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
        "absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 disabled:pointer-events-none disabled:opacity-0 sm:size-12",
        side === "left" ? "left-2 sm:left-3" : "right-2 sm:right-3"
      )}
    >
      <Icon size={22} weight="bold" />
    </button>
  )
}
