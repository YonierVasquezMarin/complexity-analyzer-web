import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';
import EmptyStateComponent from '../shared/EmptyStateComponent';
import { FiFileText } from 'react-icons/fi';
import SelectedItemNameComponent from '../components/SelectedItemNameComponent';
import AreaToEditCodeComponent from '../components/AreaToEditCodeComponent';

function ShowPseudocodePage() {
  const { selectedItem } = usePseudocodeAnalysis();

  // Si no hay item seleccionado, mostrar estado vacío
  if (!selectedItem) {
    return (
      <div className="w-full h-screen bg-[#1e1e2e] flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white">Pseudocódigo</h2>
        </div>
        <EmptyStateComponent
          icon={<FiFileText size={80} />}
          label="Selecciona un archivo para ver el pseudocódigo"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#1e1e2e] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[#3a3a4e] shrink-0 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Pseudocódigo</h2>
          <p className="text-sm text-gray-400">Pseudocódigo original del archivo</p>
        </div>
        <SelectedItemNameComponent variant="header" />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-[#2a2a3e] to-[#252536] rounded-lg border border-[#3a3a4e] p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <FiFileText className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">Código Original</h3>
            </div>
            <div className="bg-[#1e1e2e] rounded-lg border border-[#3a3a4e] overflow-hidden" style={{ height: '600px' }}>
              <AreaToEditCodeComponent readOnly={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowPseudocodePage;

