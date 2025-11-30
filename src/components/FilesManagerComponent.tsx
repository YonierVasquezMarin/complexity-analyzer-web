import ControlsForFilesSpecificComponent from '../specific-components/ControlsForFilesSpecificComponent';
import FilesListSpecificComponent from '../specific-components/FilesListSpecificComponent';

function FilesManagerComponent() {
  return (
    <div className="w-[30%] h-screen bg-[#2a2a3e] p-4 box-border overflow-y-auto flex flex-col">
      <ControlsForFilesSpecificComponent />
      <FilesListSpecificComponent />
    </div>
  )
}

export default FilesManagerComponent

