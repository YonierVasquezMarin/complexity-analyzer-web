import ControlsForCodeEditorSpecificComponent from '../specific-components/ControlsForCodeEditorSpecificComponent';
import AreaToEditCodeSpecificComponent from '../specific-components/AreaToEditCodeSpecificComponent';

function CodeEditorComponent() {
  return (
    <div className="w-[70%] h-screen bg-[#1e1e2e] flex flex-col box-border">
      <ControlsForCodeEditorSpecificComponent />
      <AreaToEditCodeSpecificComponent />
    </div>
  )
}

export default CodeEditorComponent

