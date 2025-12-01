import ControlsForCodeEditorSpecificComponent from '../specific-components/ControlsForCodeEditorSpecificComponent';
import AreaToEditCodeComponent from './AreaToEditCodeComponent';

function CodeEditorComponent() {
  return (
    <div className="w-[70%] h-screen bg-[#1e1e2e] flex flex-col box-border">
      <ControlsForCodeEditorSpecificComponent />
      <AreaToEditCodeComponent />
    </div>
  )
}

export default CodeEditorComponent

