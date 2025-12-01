import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../shared/ButtonComponent';
import { FiSave, FiEye, FiPlay } from 'react-icons/fi';
import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';

function ControlsForCodeEditorSpecificComponent() {
  const { selectedItem } = usePseudocodeAnalysis();
  const navigate = useNavigate();

  const getFileNameWithoutExtension = (fileName: string): string => {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return fileName;
    }
    return fileName.substring(0, lastDotIndex);
  };

  const handleSave = () => {
    // TODO: Implementar lógica de guardado
    console.log('Guardar');
  };

  const handleViewResults = () => {
    // TODO: Implementar lógica para ver resultados
    console.log('Ver resultados');
  };

  const handleExecuteAnalysis = () => {
    if (selectedItem) {
      navigate(`/analysis?id=${selectedItem.id}&executeAnalysis=true`);
    }
  };

  return (
    <div className="flex items-center justify-between w-full p-4 bg-[#1e1e2e] border-b border-[#3a3a4e]">
      {/* Botón Guardar - Izquierda */}
      <div className="flex-shrink-0">
        <ButtonComponent
          leftIcon={<FiSave />}
          onClick={handleSave}
          variant="default"
          size="md"
          disabled={!selectedItem}
        />
      </div>

      {/* Nombre del archivo - Centro */}
      <div className="flex-1 flex justify-center">
        <span className="text-gray-400 text-lg font-medium">
          {selectedItem ? getFileNameWithoutExtension(selectedItem.fileName) : ''}
        </span>
      </div>

      {/* Botones Ver resultados y Ejecutar análisis - Derecha */}
      <div className="flex-shrink-0 flex gap-2">
        <ButtonComponent
          leftIcon={<FiEye />}
          label="Ver resultados"
          onClick={handleViewResults}
          variant="secondary"
          size="md"
          disabled={!selectedItem}
        />
        <ButtonComponent
          leftIcon={<FiPlay />}
          label="Ejecutar análisis"
          onClick={handleExecuteAnalysis}
          variant="success"
          size="md"
          disabled={!selectedItem}
        />
      </div>
    </div>
  );
}

export default ControlsForCodeEditorSpecificComponent;

