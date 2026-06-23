import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './styles/legacy.css'
import './styles/effects.css'
import 'lenis/dist/lenis.css'
import './i18n/config'
import App from './App.tsx'
import Preloader from './components/Preloader.tsx'
import SmoothScroll from './components/SmoothScroll.tsx'
import ContactPill from './components/site/ContactPill.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Preloader />
      <SmoothScroll>
        <App />
      </SmoothScroll>
      <ContactPill />
    </BrowserRouter>
  </StrictMode>,
)
