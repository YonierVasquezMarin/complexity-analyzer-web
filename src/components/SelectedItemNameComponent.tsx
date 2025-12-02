import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';

interface SelectedItemNameComponentProps {
  variant?: 'default' | 'header';
}

function SelectedItemNameComponent({ variant = 'default' }: SelectedItemNameComponentProps) {
  const { selectedItem } = usePseudocodeAnalysis();

  const getFileNameWithoutExtension = (fileName: string): string => {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return fileName;
    }
    return fileName.substring(0, lastDotIndex);
  };

  if (!selectedItem) {
    return null;
  }

  if (variant === 'header') {
    return (
      <span className="text-gray-400 text-lg font-medium">
        {getFileNameWithoutExtension(selectedItem.fileName)}
      </span>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 bg-[#1e1e2e] border-b border-[#3a3a4e]">
      <span className="text-gray-400 text-lg font-medium">
        {getFileNameWithoutExtension(selectedItem.fileName)}
      </span>
    </div>
  );
}

export default SelectedItemNameComponent;

