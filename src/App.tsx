import { Footer, Team } from "@/components/sections/closing"
import { Hardware } from "@/components/sections/hardware"
import { Hero } from "@/components/sections/hero"
import { Presentation } from "@/components/sections/presentation"
import { Problem } from "@/components/sections/problem"
import { Software } from "@/components/sections/software"
import { System } from "@/components/sections/system"
import { Shell } from "@/components/shell"

export default function App() {
  return (
    <Shell>
      <main>
        <Hero />
        <Problem />
        <System />
        <Software />
        <Hardware />
        <Team />
        <Presentation />
      </main>
      <Footer />
    </Shell>
  )
}
