import { useVanillaModules } from "@/lib/useVanillaModules"
import Nav from "@/components/sections/Nav"
import GlobeLayer from "@/components/sections/GlobeLayer"
import Hero from "@/components/sections/Hero"
import Jurisdictions from "@/components/sections/Jurisdictions"
import Logobar from "@/components/sections/Logobar"
import StatsBand from "@/components/sections/StatsBand"
import Fear from "@/components/sections/Fear"
import Recommender from "@/components/sections/Recommender"
import BackOffice from "@/components/sections/BackOffice"
import HowWorks from "@/components/sections/HowWorks"
import Social from "@/components/sections/Social"
import Pricing from "@/components/sections/Pricing"
import Faq from "@/components/sections/Faq"
import Platform from "@/components/sections/Platform"
import Pillars from "@/components/sections/Pillars"
import Integrations from "@/components/sections/Integrations"
import FinalCta from "@/components/sections/FinalCta"
import Footer from "@/components/sections/Footer"

/**
 * Homepage — retains the proven vanilla module bridge (globe, particles, 3D bento,
 * scroll scene, Gabriella modal, forms). The other routes are pure React/shadcn.
 */
export default function Home() {
  useVanillaModules()

  return (
    <>
      <a className="skip-link" href="#top">Skip to content</a>
      <Nav />
      <GlobeLayer />
      <main id="top" tabIndex={-1}>
        <Hero />
        <Jurisdictions />
        <Logobar />
        <StatsBand />
        <Fear />
        <Recommender />
        <BackOffice />
        <HowWorks />
        <Social />
        <Pricing />
        <Faq />
        <Platform />
        <Pillars />
        <Integrations />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
