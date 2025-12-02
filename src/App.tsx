import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ModalProvider } from './context/ModalProvider'
import HomePage from './pages/HomePage'
import AnalysisPage from './pages/AnalysisPage'
import ShowConvertedPseudocodePage from './pages/ShowConvertedPseudocodePage'

function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/converted-pseudocode" element={<ShowConvertedPseudocodePage />} />
        </Routes>
      </BrowserRouter>
    </ModalProvider>
  )
}

export default App
