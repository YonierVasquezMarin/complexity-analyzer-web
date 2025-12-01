import ControlsForFilesSpecificComponent from '../specific-components/ControlsForFilesSpecificComponent';
import FilesListSpecificComponent from '../specific-components/FilesListSpecificComponent';

function FilesManagerComponent() {
  return (
    <div className="w-[30%] h-screen bg-[#2a2a3e] pt-4 pl-4 pr-0 pb-0 box-border flex flex-col">
      <div className="pr-4">
        <ControlsForFilesSpecificComponent />
      </div>
      <FilesListSpecificComponent />
    </div>
  )
}

export default FilesManagerComponent

