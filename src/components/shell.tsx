import { useEffect, useState, type ReactNode } from "react"
import { List, X } from "@phosphor-icons/react"

import logo from "@/assets/ares-reflect-logo.png"
import { NAV } from "@/lib/content"
import { cn } from "@/lib/utils"

function useActiveSection() {
  const [active, setActive] = useState(NAV[0].id)
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

function Brand() {
  return (
    <a href="#genel" className="flex items-center gap-3">
      <img src={logo} alt="ARES-Reflect logosu" className="size-12 rounded-[10px] object-cover" width={48} height={48} />
      <span className="leading-none">
        <strong className="block text-[0.95rem] font-bold tracking-[0.12em] whitespace-nowrap">ARES-REFLECT</strong>
      </span>
    </a>
  )
}

function NavList({ active, onNavigate }: { active: string; onNavigate?: () => void }) {
  return (
    <nav aria-label="Bölümler" className="py-4">
      {NAV.map((n, i) => (
        <a
          key={n.id}
          href={`#${n.id}`}
          onClick={onNavigate}
          aria-current={active === n.id ? "true" : undefined}
          className={cn(
            "relative flex h-[52px] items-center gap-4 px-4 text-[0.95rem] font-semibold tracking-[0.1em] uppercase transition-colors",
            active === n.id ? "bg-gradient-to-r from-white/15 to-transparent text-white" : "text-[#dcecff]/85 hover:bg-white/5 hover:text-white"
          )}
        >
          {active === n.id && <span className="absolute inset-y-0 left-0 w-[3px] bg-white shadow-[0_0_14px_rgba(255,255,255,0.8)]" />}
          <span className={cn("w-4 font-mono text-[0.625rem] font-normal tracking-normal", active === n.id ? "text-white" : "text-[#a8c8ee]/80")}>
            {String(i + 1).padStart(2, "0")}
          </span>
          {n.label}
        </a>
      ))}
    </nav>
  )
}

export function Shell({ children }: { children: ReactNode }) {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* left rail — desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[230px] flex-col border-r border-border bg-gradient-to-b from-[#171f2b] via-[#111923] to-[#0b1119] lg:flex">
        <div className="border-b border-white/10 p-4">
          <Brand />
        </div>
        <NavList active={active} />
        <div className="mt-auto flex items-center gap-3 border-t border-white/10 bg-[#001230]/50 px-4 py-4">
          <span className="blink size-2 rounded-full bg-primary" />
          <div>
            <p className="font-mono text-[0.7rem] font-bold tracking-[0.08em] text-white">TEKNOFEST 2026</p>
            <p className="font-mono text-[0.55rem] tracking-[0.14em] text-[#c4daf4]/80">HAREKETLİ UYDU TERMİNALİ</p>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[230px]">
        {/* top strip */}
        <header className="sticky top-0 z-30 flex h-14 items-stretch border-b border-border bg-panel/95 backdrop-blur lg:h-11">
          <div className="flex items-center px-4 lg:hidden">
            <Brand />
          </div>
          <StripCell label="Takım" value="PATH" className="max-lg:hidden" />
          <StripCell label="Takım ID" value="815048" className="max-xl:hidden" />
          <StripCell label="Kategori" value="HAREKETLİ UYDU TERMİNALİ" className="max-md:hidden" />
          <div className="ml-auto flex items-center gap-2.5 px-5 text-xs font-semibold tracking-[0.2em] text-primary max-lg:hidden">
            <span className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
            TEKNOFEST 2026
          </div>
          <button
            type="button"
            className="ml-auto flex w-14 items-center justify-center border-l border-border text-foreground lg:hidden"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <List className="size-5" />}
          </button>
        </header>

        {open && (
          <div className="fixed inset-x-0 top-14 z-30 border-b border-border bg-gradient-to-b from-[#171f2b] to-[#0b1119] lg:hidden">
            <NavList active={active} onNavigate={() => setOpen(false)} />
          </div>
        )}

        {children}
      </div>
    </>
  )
}

function StripCell({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={cn("flex min-w-36 flex-col justify-center border-r border-border px-5", className)}>
      <span className="font-mono text-[0.55rem] tracking-[0.2em] text-muted-foreground uppercase">{label}</span>
      <b className="mt-0.5 font-mono text-[0.7rem] font-medium tracking-[0.06em]">{value}</b>
    </div>
  )
}
