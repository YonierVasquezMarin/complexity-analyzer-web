import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AnalysisPage from '../pages/AnalysisPage'
import ShowConvertedPseudocodePage from '../pages/ShowConvertedPseudocodePage'
import ShowSystemAnalysisPage from '../pages/ShowSystemAnalysisPage'
import ShowLLMAnalysisPage from '../pages/ShowLLMAnalysisPage'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/converted-pseudocode" element={<ShowConvertedPseudocodePage />} />
      <Route path="/system-analysis" element={<ShowSystemAnalysisPage />} />
      <Route path="/llm-analysis" element={<ShowLLMAnalysisPage />} />
    </Routes>
  )
}

