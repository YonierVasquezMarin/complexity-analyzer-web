import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';
import EmptyStateComponent from '../shared/EmptyStateComponent';
import { BsFolder2Open } from 'react-icons/bs';

function FilesListSpecificComponent() {
  const { items, selectedItem, selectItem } = usePseudocodeAnalysis();

  const getFileNameWithoutExtension = (fileName: string): string => {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return fileName;
    }
    return fileName.substring(0, lastDotIndex);
  };

  const handleItemClick = (item: typeof items[0]) => {
    selectItem(item);
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
          {items.map((item) => {
            const isSelected = selectedItem?.id === item.id;
            return (
              <li
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`text-white text-sm p-2 rounded cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-[#5a5a7e] hover:bg-[#6a6a8e]'
                    : 'bg-[#3a3a4e] hover:bg-[#454556]'
                }`}
              >
                {getFileNameWithoutExtension(item.fileName)}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default FilesListSpecificComponent;

