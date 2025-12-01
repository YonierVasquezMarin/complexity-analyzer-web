import { useEffect } from 'react';
import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';
import EmptyStateComponent from '../shared/EmptyStateComponent';
import { FiFileText } from 'react-icons/fi';

interface AreaToEditCodeSpecificComponentProps {
  readOnly?: boolean;
}

function AreaToEditCodeComponent({ readOnly = false }: AreaToEditCodeSpecificComponentProps) {
  const { selectedItem, editedCode, setEditedCode } = usePseudocodeAnalysis();

  // Actualizar el código cuando cambia el item seleccionado
  useEffect(() => {
    if (selectedItem) {
      setEditedCode(selectedItem.pseudocode);
    } else {
      setEditedCode('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (readOnly) return;
    
    const newCode = event.target.value;
    // Solo actualizar el estado temporal, no guardar automáticamente
    setEditedCode(newCode);
  };

  // Si no hay archivo seleccionado, mostrar el estado vacío
  if (!selectedItem) {
    return (
      <div className="flex-1 w-full h-full">
        <EmptyStateComponent
          icon={<FiFileText size={80} />}
          label="Selecciona un archivo para editar"
        />
      </div>
    );
  }

  return (
    <div className="flex-1 w-full h-full">
      <textarea
        value={editedCode}
        onChange={handleCodeChange}
        readOnly={readOnly}
        placeholder="Escribe tu pseudocódigo aquí..."
        className={`w-full h-full bg-[#1e1e2e] text-white p-4 font-mono text-sm resize-none outline-none border-none focus:ring-0 ${
          readOnly ? 'cursor-default' : ''
        }`}
        style={{ 
          caretColor: readOnly ? 'transparent' : '#ffffff',
          lineHeight: '1.6',
        }}
      />
    </div>
  );
}

export default AreaToEditCodeComponent;

