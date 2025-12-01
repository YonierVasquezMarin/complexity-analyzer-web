import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';
import EmptyStateComponent from '../shared/EmptyStateComponent';
import { BsFolder2Open } from 'react-icons/bs';
import FileItemComponent from './FileItemComponent';

function FilesListSpecificComponent() {
  const { items, selectedItem, selectItem } = usePseudocodeAnalysis();

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
              <FileItemComponent
                key={item.id}
                item={item}
                isSelected={isSelected}
                onClick={handleItemClick}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default FilesListSpecificComponent;

