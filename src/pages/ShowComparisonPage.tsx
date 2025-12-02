import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';
import EmptyStateComponent from '../shared/EmptyStateComponent';
import { FiCpu, FiZap, FiTarget, FiCheckCircle, FiXCircle, FiBarChart2 } from 'react-icons/fi';
import SelectedItemNameComponent from '../components/SelectedItemNameComponent';

function ShowComparisonPage() {
  const { selectedItem } = usePseudocodeAnalysis();

  // Si no hay item seleccionado, mostrar estado vacío
  if (!selectedItem) {
    return (
      <div className="w-full h-screen bg-[#1e1e2e] flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white">Comparación de Resultados</h2>
        </div>
        <EmptyStateComponent
          icon={<FiBarChart2 size={80} />}
          label="Selecciona un archivo para ver la comparación"
        />
      </div>
    );
  }

  // Si no hay ambos análisis, mostrar mensaje
  if (!selectedItem.systemAnalysis || !selectedItem.llmAnalysis) {
    return (
      <div className="w-full h-screen bg-[#1e1e2e] flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white">Comparación de Resultados</h2>
        </div>
        <EmptyStateComponent
          icon={<FiBarChart2 size={80} />}
          label="Ambos análisis deben estar completos para realizar la comparación"
        />
      </div>
    );
  }

  const { systemAnalysis, llmAnalysis } = selectedItem;

  // Función para comparar valores
  const areValuesEqual = (val1: string, val2: string): boolean => {
    return val1.trim().toLowerCase() === val2.trim().toLowerCase();
  };

  // Comparar valores
  const oMatch = areValuesEqual(systemAnalysis.O, llmAnalysis.basic_complexity.O);
  const omegaMatch = areValuesEqual(systemAnalysis.Omega, llmAnalysis.basic_complexity.Omega);
  const thetaMatch = areValuesEqual(systemAnalysis.Theta, llmAnalysis.basic_complexity.Theta);

  return (
    <div className="w-full h-screen bg-[#1e1e2e] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[#3a3a4e] flex-shrink-0 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Comparación de Resultados</h2>
          <p className="text-sm text-gray-400">Comparación entre análisis por sistema y análisis por LLM</p>
        </div>
        <SelectedItemNameComponent variant="header" />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Comparación de Notaciones Big O */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Big O */}
            <div className="bg-gradient-to-br from-[#2a2a3e] to-[#252536] rounded-lg border border-[#3a3a4e] p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <FiCpu className="text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Notación O</h3>
                  <p className="text-xs text-gray-400">Cota superior</p>
                </div>
              </div>
              
              {/* Sistema */}
              <div className="mb-3">
                <p className="text-xs text-gray-400 mb-2">Análisis por Sistema</p>
                <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                  <code className="text-xl font-bold text-blue-400 font-mono">
                    O({systemAnalysis.O})
                  </code>
                </div>
              </div>

              {/* LLM */}
              <div className="mb-3">
                <p className="text-xs text-gray-400 mb-2">Análisis por LLM</p>
                <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                  <code className="text-xl font-bold text-blue-400 font-mono">
                    O({llmAnalysis.basic_complexity.O})
                  </code>
                </div>
              </div>

              {/* Resultado de comparación */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#3a3a4e]">
                {oMatch ? (
                  <>
                    <FiCheckCircle className="text-green-400" size={20} />
                    <span className="text-green-400 text-sm font-semibold">Coinciden</span>
                  </>
                ) : (
                  <>
                    <FiXCircle className="text-red-400" size={20} />
                    <span className="text-red-400 text-sm font-semibold">No coinciden</span>
                  </>
                )}
              </div>
            </div>

            {/* Omega */}
            <div className="bg-gradient-to-br from-[#2a2a3e] to-[#252536] rounded-lg border border-[#3a3a4e] p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <FiZap className="text-green-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Notación Ω</h3>
                  <p className="text-xs text-gray-400">Cota inferior</p>
                </div>
              </div>
              
              {/* Sistema */}
              <div className="mb-3">
                <p className="text-xs text-gray-400 mb-2">Análisis por Sistema</p>
                <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                  <code className="text-xl font-bold text-green-400 font-mono">
                    Ω({systemAnalysis.Omega})
                  </code>
                </div>
              </div>

              {/* LLM */}
              <div className="mb-3">
                <p className="text-xs text-gray-400 mb-2">Análisis por LLM</p>
                <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                  <code className="text-xl font-bold text-green-400 font-mono">
                    Ω({llmAnalysis.basic_complexity.Omega})
                  </code>
                </div>
              </div>

              {/* Resultado de comparación */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#3a3a4e]">
                {omegaMatch ? (
                  <>
                    <FiCheckCircle className="text-green-400" size={20} />
                    <span className="text-green-400 text-sm font-semibold">Coinciden</span>
                  </>
                ) : (
                  <>
                    <FiXCircle className="text-red-400" size={20} />
                    <span className="text-red-400 text-sm font-semibold">No coinciden</span>
                  </>
                )}
              </div>
            </div>

            {/* Theta */}
            <div className="bg-gradient-to-br from-[#2a2a3e] to-[#252536] rounded-lg border border-[#3a3a4e] p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <FiTarget className="text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Notación Θ</h3>
                  <p className="text-xs text-gray-400">Cota ajustada</p>
                </div>
              </div>
              
              {/* Sistema */}
              <div className="mb-3">
                <p className="text-xs text-gray-400 mb-2">Análisis por Sistema</p>
                <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                  <code className="text-xl font-bold text-purple-400 font-mono">
                    Θ({systemAnalysis.Theta})
                  </code>
                </div>
              </div>

              {/* LLM */}
              <div className="mb-3">
                <p className="text-xs text-gray-400 mb-2">Análisis por LLM</p>
                <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                  <code className="text-xl font-bold text-purple-400 font-mono">
                    Θ({llmAnalysis.basic_complexity.Theta})
                  </code>
                </div>
              </div>

              {/* Resultado de comparación */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#3a3a4e]">
                {thetaMatch ? (
                  <>
                    <FiCheckCircle className="text-green-400" size={20} />
                    <span className="text-green-400 text-sm font-semibold">Coinciden</span>
                  </>
                ) : (
                  <>
                    <FiXCircle className="text-red-400" size={20} />
                    <span className="text-red-400 text-sm font-semibold">No coinciden</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Resumen de Comparación */}
          <div className="bg-gradient-to-br from-[#2a2a3e] to-[#252536] rounded-lg border border-[#3a3a4e] p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <FiBarChart2 className="text-indigo-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">Resumen de Comparación</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-300">Notación O</span>
                  {oMatch ? (
                    <FiCheckCircle className="text-green-400" size={20} />
                  ) : (
                    <FiXCircle className="text-red-400" size={20} />
                  )}
                </div>
                <p className="text-xs text-gray-400">
                  {oMatch ? 'Los valores coinciden' : 'Los valores no coinciden'}
                </p>
              </div>

              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-300">Notación Ω</span>
                  {omegaMatch ? (
                    <FiCheckCircle className="text-green-400" size={20} />
                  ) : (
                    <FiXCircle className="text-red-400" size={20} />
                  )}
                </div>
                <p className="text-xs text-gray-400">
                  {omegaMatch ? 'Los valores coinciden' : 'Los valores no coinciden'}
                </p>
              </div>

              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-300">Notación Θ</span>
                  {thetaMatch ? (
                    <FiCheckCircle className="text-green-400" size={20} />
                  ) : (
                    <FiXCircle className="text-red-400" size={20} />
                  )}
                </div>
                <p className="text-xs text-gray-400">
                  {thetaMatch ? 'Los valores coinciden' : 'Los valores no coinciden'}
                </p>
              </div>
            </div>

            {/* Coincidencia total */}
            <div className="mt-6 pt-6 border-t border-[#3a3a4e]">
              <div className="flex items-center justify-center gap-3">
                {oMatch && omegaMatch && thetaMatch ? (
                  <>
                    <FiCheckCircle className="text-green-400" size={24} />
                    <span className="text-green-400 text-lg font-bold">
                      Todos los valores coinciden
                    </span>
                  </>
                ) : (
                  <>
                    <FiXCircle className="text-yellow-400" size={24} />
                    <span className="text-yellow-400 text-lg font-bold">
                      Algunos valores no coinciden
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowComparisonPage;

