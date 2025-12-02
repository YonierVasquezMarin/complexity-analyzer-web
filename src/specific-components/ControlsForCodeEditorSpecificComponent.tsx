import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../shared/ButtonComponent';
import { FiSave, FiEye, FiPlay } from 'react-icons/fi';
import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';
import { ModalService } from '../services/ModalService';
import SelectedItemNameComponent from '../components/SelectedItemNameComponent';

function ControlsForCodeEditorSpecificComponent() {
  const { selectedItem, saveEditedCode, setExecuteAnalysisInThisMoment, updateItem } = usePseudocodeAnalysis();
  const navigate = useNavigate();

  const handleSave = () => {
    if (selectedItem) {
      saveEditedCode();
      console.log('Código guardado exitosamente');
    }
  };

  const handleViewResults = () => {
    if (selectedItem) {
      // Establecer el estado en false para solo ver resultados sin ejecutar análisis
      setExecuteAnalysisInThisMoment(false);
      // Usar requestAnimationFrame para asegurar que el estado se actualice antes de navegar
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          navigate('/analysis');
        });
      });
    }
  };

  const executeAnalysis = (clearResults = false) => {
    if (selectedItem) {
      // Si se debe limpiar resultados, actualizar el item sin los análisis
      if (clearResults) {
        const updatedItem = {
          ...selectedItem,
          systemAnalysis: undefined,
          llmAnalysis: undefined,
        };
        updateItem(updatedItem);
      }

      // Establecer el estado primero
      setExecuteAnalysisInThisMoment(true);
      // Usar requestAnimationFrame para asegurar que el estado se actualice antes de navegar
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          navigate('/analysis');
        });
      });
    }
  };

  const handleExecuteAnalysis = () => {
    if (!selectedItem) return;

    // Verificar si ya existen resultados guardados
    const hasResults = selectedItem.systemAnalysis || selectedItem.llmAnalysis;

    if (hasResults) {
      // Mostrar modal de confirmación
      ModalService.showModal({
        title: 'Confirmar ejecución',
        content: 'Ya existe un resultado, ¿Desea ejecutar de nuevo el análisis?',
        labelYes: 'Sí',
        labelNo: 'No',
        actionForYes: () => {
          // Limpiar resultados y ejecutar análisis
          executeAnalysis(true);
        },
        actionForNo: () => {
          // No hacer nada, solo cerrar el modal
        },
      });
    } else {
      // Si no hay resultados, ejecutar directamente
      executeAnalysis();
    }
  };

  return (
    <div className="flex items-center justify-between w-full p-4 bg-[#1e1e2e] border-b border-[#3a3a4e]">
      {/* Botón Guardar - Izquierda */}
      <div className="flex-shrink-0">
        <ButtonComponent
          leftIcon={<FiSave />}
          onClick={handleSave}
          variant="secondary"
          size="md"
          disabled={!selectedItem}
        />
      </div>

      {/* Nombre del archivo - Centro */}
      <div className="flex-1 flex justify-center">
        <SelectedItemNameComponent variant="header" />
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

