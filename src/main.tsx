import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './styles/legacy.css'
import './styles/effects.css'
import 'lenis/dist/lenis.css'
import App from './App.tsx'
import Preloader from './components/Preloader.tsx'
import SmoothScroll from './components/SmoothScroll.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Preloader />
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </BrowserRouter>
  </StrictMode>,
)
