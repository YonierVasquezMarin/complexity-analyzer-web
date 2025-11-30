import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PseudocodeAnalysisProvider } from './context/PseudocodeAnalysisContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PseudocodeAnalysisProvider>
      <App />
    </PseudocodeAnalysisProvider>
  </StrictMode>,
)
