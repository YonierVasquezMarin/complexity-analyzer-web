import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ModalProvider } from './context/ModalProvider'
import HomePage from './pages/HomePage'
import AnalysisPage from './pages/AnalysisPage'

function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
        </Routes>
      </BrowserRouter>
    </ModalProvider>
  )
}

export default App
