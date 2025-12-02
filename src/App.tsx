import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from './context/ModalProvider'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ModalProvider>
  )
}

export default App
