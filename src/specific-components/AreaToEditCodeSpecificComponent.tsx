import { useState, useEffect } from 'react';
import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';

function AreaToEditCodeSpecificComponent() {
  const { selectedItem, updateItem } = usePseudocodeAnalysis();
  const [code, setCode] = useState<string>('');

  // Actualizar el código cuando cambia el item seleccionado
  useEffect(() => {
    if (selectedItem) {
      setCode(selectedItem.pseudocode);
    } else {
      setCode('');
    }
  }, [selectedItem]);

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = event.target.value;
    setCode(newCode);
    
    // Actualizar el item en el contexto si hay uno seleccionado
    if (selectedItem) {
      updateItem({
        ...selectedItem,
        pseudocode: newCode,
      });
    }
  };

  return (
    <div className="flex-1 w-full h-full">
      <textarea
        value={code}
        onChange={handleCodeChange}
        placeholder={selectedItem ? 'Escribe tu pseudocódigo aquí...' : 'Selecciona un archivo para editar'}
        disabled={!selectedItem}
        className="w-full h-full bg-[#1e1e2e] text-white p-4 font-mono text-sm resize-none outline-none border-none focus:ring-0 disabled:opacity-50 disabled:cursor-default"
        style={{ 
          caretColor: '#ffffff',
          lineHeight: '1.6',
        }}
      />
    </div>
  );
}

export default AreaToEditCodeSpecificComponent;

