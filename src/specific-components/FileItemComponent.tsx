import { useState } from 'react';
import type { PseudocodeAnalysisModel } from '../models/PseudocodeAnalysisModel';
import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';
import { ModalService } from '../services/ModalService';
import { FiDownload, FiTrash2 } from 'react-icons/fi';
import ButtonComponent from '../shared/ButtonComponent';

interface FileItemComponentProps {
  item: PseudocodeAnalysisModel;
  isSelected: boolean;
  onClick: (item: PseudocodeAnalysisModel) => void;
}

function FileItemComponent({ item, isSelected, onClick }: FileItemComponentProps) {
  const { deleteItem } = usePseudocodeAnalysis();
  const [isHovered, setIsHovered] = useState(false);

  const getFileNameWithoutExtension = (fileName: string): string => {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return fileName;
    }
    return fileName.substring(0, lastDotIndex);
  };

  const handleDownload = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const blob = new Blob([item.pseudocode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = item.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDelete = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    ModalService.showModal({
      title: 'Confirmar eliminación',
      size: 'sm',
      content: '¿Estás seguro de eliminar este archivo?',
      labelYes: 'Ok',
      labelNo: 'Cancelar',
      actionForYes: () => {
        deleteItem(item.id);
      },
      actionForNo: () => {
        // No hacer nada al cancelar
      },
    });
  };

  return (
    <li
      onClick={() => onClick(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`text-white text-sm p-2 rounded cursor-pointer transition-colors flex items-center justify-between group ${
        isSelected
          ? 'bg-[#5a5a7e] hover:bg-[#6a6a8e]'
          : 'bg-[#3a3a4e] hover:bg-[#454556]'
      }`}
    >
      <span className="flex-1">{getFileNameWithoutExtension(item.fileName)}</span>
      <div
        className={`flex items-center gap-2 transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ButtonComponent
          onClick={handleDownload}
          variant="ghost"
          size="sm"
          leftIcon={<FiDownload size={16} />}
          title="Descargar archivo"
        />
        <ButtonComponent
          onClick={handleDelete}
          variant="ghost"
          size="sm"
          leftIcon={<FiTrash2 size={16} />}
          title="Eliminar archivo"
        />
      </div>
    </li>
  );
}

export default FileItemComponent;

