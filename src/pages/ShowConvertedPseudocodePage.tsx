import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';
import EmptyStateComponent from '../shared/EmptyStateComponent';
import { FiFileText, FiArrowRight } from 'react-icons/fi';

function ShowConvertedPseudocodePage() {
  const { selectedItem } = usePseudocodeAnalysis();

  // Si no hay item seleccionado, mostrar estado vacío
  if (!selectedItem) {
    return (
      <div className="w-full h-screen bg-[#1e1e2e] flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white">Pseudocódigo Convertido</h2>
        </div>
        <EmptyStateComponent
          icon={<FiFileText size={80} />}
          label="Selecciona un archivo para ver la conversión"
        />
      </div>
    );
  }

  // Si no hay convertedPseudocode, mostrar mensaje
  if (!selectedItem.convertedPseudocode) {
    return (
      <div className="w-full h-screen bg-[#1e1e2e] flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white">Pseudocódigo Convertido</h2>
        </div>
        <EmptyStateComponent
          icon={<FiFileText size={80} />}
          label="Este archivo aún no tiene pseudocódigo convertido"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#1e1e2e] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[#3a3a4e]">
        <h2 className="text-2xl font-bold text-white">Pseudocódigo Convertido</h2>
      </div>

      {/* Contenido principal: antes y después */}
      <div className="flex-1 flex items-center justify-center p-6 gap-8 overflow-hidden">
        {/* Columna izquierda - Pseudocódigo original */}
        <div className="flex-1 h-full flex flex-col bg-[#2a2a3e] rounded-lg border border-[#3a3a4e] overflow-hidden">
          <div className="p-4 border-b border-[#3a3a4e] bg-[#252536]">
            <h3 className="text-lg font-semibold text-white">Antes</h3>
            <p className="text-sm text-gray-400 mt-1">Pseudocódigo original</p>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <pre className="text-white font-mono text-sm whitespace-pre-wrap break-words">
              {selectedItem.pseudocode || '(Vacío)'}
            </pre>
          </div>
        </div>

        {/* Flecha central */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <FiArrowRight size={48} className="text-blue-500" />
        </div>

        {/* Columna derecha - Pseudocódigo convertido */}
        <div className="flex-1 h-full flex flex-col bg-[#2a2a3e] rounded-lg border border-[#3a3a4e] overflow-hidden">
          <div className="p-4 border-b border-[#3a3a4e] bg-[#252536]">
            <h3 className="text-lg font-semibold text-white">Después</h3>
            <p className="text-sm text-gray-400 mt-1">Pseudocódigo convertido</p>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <pre className="text-white font-mono text-sm whitespace-pre-wrap break-words">
              {selectedItem.convertedPseudocode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowConvertedPseudocodePage;

