import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AnalysisPage from '../pages/AnalysisPage'
import ShowConvertedPseudocodePage from '../pages/ShowConvertedPseudocodePage'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/converted-pseudocode" element={<ShowConvertedPseudocodePage />} />
    </Routes>
  )
}

