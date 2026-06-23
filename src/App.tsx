import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import Home from "@/pages/Home"
import SiteLayout from "@/components/site/SiteLayout"
import Jurisdictions from "@/pages/Jurisdictions"
import JurisdictionDetail from "@/pages/JurisdictionDetail"
import Compare from "@/pages/Compare"
import About from "@/pages/About"
import Contact from "@/pages/Contact"

/** Redirect the original site's *.html URLs to the SPA's clean routes, so links
 *  in the (bridged) homepage and any external/bookmarked .html URLs keep working. */
function HtmlRedirect() {
  const { pathname, search } = useLocation()
  const file = pathname.replace(/^\//, "").toLowerCase()
  if (file === "jurisdiction.html") {
    const slug = new URLSearchParams(search).get("slug")
    return <Navigate to={slug ? `/jurisdiction/${slug}` : "/jurisdictions"} replace />
  }
  const map: Record<string, string> = {
    "index.html": "/",
    "jurisdictions.html": "/jurisdictions",
    "compare.html": "/compare",
    "about.html": "/about",
    "contact.html": "/contact",
  }
  return <Navigate to={map[file] ?? "/"} replace />
}

function App() {
  return (
    <Routes>
      {/* Homepage keeps the vanilla module bridge (globe/particles/3D). */}
      <Route path="/" element={<Home />} />

      {/* All other pages are pure React/shadcn under a shared layout. */}
      <Route element={<SiteLayout />}>
        <Route path="/jurisdictions" element={<Jurisdictions />} />
        <Route path="/jurisdiction/:slug" element={<JurisdictionDetail />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* *.html → clean route, everything else → home */}
      <Route path="*" element={<HtmlRedirect />} />
    </Routes>
  )
}

export default App
