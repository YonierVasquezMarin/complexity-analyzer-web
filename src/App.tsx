import './App.css'
import FilesManagerComponent from './components/FilesManagerComponent'
import CodeEditorComponent from './components/CodeEditorComponent'
import { ModalProvider } from './context/ModalProvider'

function App() {
  return (
    <ModalProvider>
      <div className="app-container">
        <FilesManagerComponent />
        <CodeEditorComponent />
      </div>
    </ModalProvider>
  )
}

export default App
