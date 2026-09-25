import type { ReactNode } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

/** Page block styled like the Control Station's page heading: "07 / PROJE DOSYASI" + big uppercase title. */
export function Section({
  id,
  code,
  title,
  description,
  className,
  children,
}: {
  id: string
  code: string
  title: ReactNode
  description?: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} className={cn("px-4 py-16 sm:px-8 md:py-20", className)}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <header className="border-b border-border pb-6">
            <p className="font-mono text-[0.65rem] tracking-[0.2em] text-primary uppercase">{code}</p>
            <h2 className="mt-2 text-3xl leading-tight font-bold uppercase sm:text-4xl">{title}</h2>
            {description && (
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">{description}</p>
            )}
          </header>
        </Reveal>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}

/** Sub-heading like "01 SİSTEM YAKLAŞIMI" in the app's project page. */
export function SubHeading({ no, children, className }: { no: string; children: ReactNode; className?: string }) {
  return (
    <h3 className={cn("flex items-baseline gap-2.5 border-b border-border pb-3 text-sm font-bold tracking-[0.2em] uppercase", className)}>
      <span className="font-mono text-[0.65rem] font-normal tracking-normal text-primary">{no}</span>
      {children}
    </h3>
  )
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Instrument panel with amber corner brackets on all four corners, as in the app. */
export function Panel({
  children,
  className,
  title,
  icon,
  meta,
}: {
  children: ReactNode
  className?: string
  title?: string
  icon?: ReactNode
  meta?: ReactNode
}) {
  return (
    <div className={cn("relative border border-border bg-panel", className)}>
      {(title || meta) && (
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          {title && (
            <span className="flex items-center gap-2 text-[0.8rem] font-bold tracking-[0.08em] uppercase">
              {icon && <span className="text-primary [&_svg]:size-4">{icon}</span>}
              {title}
            </span>
          )}
          {meta && <span className="label-mono text-muted-foreground">{meta}</span>}
        </div>
      )}
      {children}
      <Corners />
    </div>
  )
}

export function Corners({ className }: { className?: string }) {
  const c = "pointer-events-none absolute size-3 border-primary"
  return (
    <span aria-hidden className={className}>
      <span className={cn(c, "-top-px -left-px border-t-2 border-l-2")} />
      <span className={cn(c, "-top-px -right-px border-t-2 border-r-2")} />
      <span className={cn(c, "-bottom-px -left-px border-b-2 border-l-2")} />
      <span className={cn(c, "-right-px -bottom-px border-r-2 border-b-2")} />
    </span>
  )
}

/** Small data cell: mono label, amber mono value, muted note — the app's hardware card style. */
export function DataCell({ label, value, note, className }: { label: string; value: ReactNode; note?: ReactNode; className?: string }) {
  return (
    <div className={cn("border border-border bg-card p-4", className)}>
      <p className="label-mono text-[0.55rem] text-muted-foreground">{label}</p>
      <p className="mt-2 font-mono text-lg text-primary">{value}</p>
      {note && <p className="mt-1.5 text-[0.8rem] leading-snug text-muted-foreground">{note}</p>}
    </div>
  )
}
