import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';
import EmptyStateComponent from '../shared/EmptyStateComponent';
import { BsFolder2Open } from 'react-icons/bs';

function FilesListSpecificComponent() {
  const { items } = usePseudocodeAnalysis();

  const getFileNameWithoutExtension = (fileName: string): string => {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return fileName;
    }
    return fileName.substring(0, lastDotIndex);
  };

  return (
    <div className="flex-1 flex flex-col mt-5 overflow-y-auto min-h-0 pr-4 pb-4">
      {items.length === 0 ? (
        <EmptyStateComponent
          icon={<BsFolder2Open size={80} />}
          label="No hay archivos guardados"
        />
      ) : (
        <ul className="space-y-5">
          {items.map((item) => (
            <li
              key={item.id}
              className="text-white text-sm p-2 bg-[#3a3a4e] rounded hover:bg-[#4a4a5e] cursor-pointer transition-colors"
            >
              {getFileNameWithoutExtension(item.fileName)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilesListSpecificComponent;

