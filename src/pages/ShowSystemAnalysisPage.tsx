import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';
import EmptyStateComponent from '../shared/EmptyStateComponent';
import { FiBarChart2, FiCpu, FiZap, FiTarget, FiRefreshCw, FiCheckCircle, FiXCircle } from 'react-icons/fi';

function ShowSystemAnalysisPage() {
  const { selectedItem } = usePseudocodeAnalysis();

  // Si no hay item seleccionado, mostrar estado vacío
  if (!selectedItem) {
    return (
      <div className="w-full h-screen bg-[#1e1e2e] flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white">Análisis por Sistema</h2>
        </div>
        <EmptyStateComponent
          icon={<FiBarChart2 size={80} />}
          label="Selecciona un archivo para ver el análisis"
        />
      </div>
    );
  }

  // Si no hay systemAnalysis, mostrar mensaje
  if (!selectedItem.systemAnalysis) {
    return (
      <div className="w-full h-screen bg-[#1e1e2e] flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white">Análisis por Sistema</h2>
        </div>
        <EmptyStateComponent
          icon={<FiBarChart2 size={80} />}
          label="Este archivo aún no tiene análisis por sistema"
        />
      </div>
    );
  }

  const { systemAnalysis } = selectedItem;

  return (
    <div className="w-full h-screen bg-[#1e1e2e] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[#3a3a4e] flex-shrink-0">
        <h2 className="text-2xl font-bold text-white mb-2">Análisis por Sistema</h2>
        <p className="text-sm text-gray-400">Análisis de complejidad algorítmica</p>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Notaciones Big O */}
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
              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                <code className="text-2xl font-bold text-blue-400 font-mono">
                  O({systemAnalysis.O})
                </code>
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
              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                <code className="text-2xl font-bold text-green-400 font-mono">
                  Ω({systemAnalysis.Omega})
                </code>
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
              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                <code className="text-2xl font-bold text-purple-400 font-mono">
                  Θ({systemAnalysis.Theta})
                </code>
              </div>
            </div>
          </div>

          {/* Detalles de Complejidad */}
          <div className="bg-gradient-to-br from-[#2a2a3e] to-[#252536] rounded-lg border border-[#3a3a4e] p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <FiRefreshCw className="text-yellow-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">Detalles de Complejidad</h3>
            </div>

            <div className="space-y-4">
              {/* Loops */}
              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Bucles Detectados
                </h4>
                {systemAnalysis.details.loops && systemAnalysis.details.loops.length > 0 ? (
                  <ul className="space-y-2">
                    {systemAnalysis.details.loops.map((loop, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <code className="text-white font-mono text-sm bg-[#252536] px-3 py-1 rounded flex-1">
                          {loop}
                        </code>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm italic">No se detectaron bucles</p>
                )}
              </div>

              {/* Recursion */}
              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Recursión
                </h4>
                {systemAnalysis.details.recursion ? (
                  <code className="text-white font-mono text-sm bg-[#252536] px-3 py-2 rounded block">
                    {systemAnalysis.details.recursion}
                  </code>
                ) : (
                  <p className="text-gray-400 text-sm italic">No se detectó recursión</p>
                )}
              </div>

              {/* Combination */}
              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Combinación
                </h4>
                <code className="text-white font-mono text-sm bg-[#252536] px-3 py-2 rounded block">
                  {systemAnalysis.details.combination}
                </code>
              </div>

              {/* Early Exit */}
              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  Salida Temprana Detectada
                </h4>
                <div className="flex items-center gap-3">
                  {systemAnalysis.details.early_exit_detected ? (
                    <>
                      <FiCheckCircle className="text-green-400" size={20} />
                      <span className="text-green-400 font-semibold">Sí</span>
                      <span className="text-gray-400 text-sm">El algoritmo puede terminar antes de completar todas las iteraciones</span>
                    </>
                  ) : (
                    <>
                      <FiXCircle className="text-gray-500" size={20} />
                      <span className="text-gray-400 font-semibold">No</span>
                      <span className="text-gray-500 text-sm">No se detectó salida temprana</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pseudocódigo Convertido (referencia) */}
          {selectedItem.convertedPseudocode && (
            <div className="bg-gradient-to-br from-[#2a2a3e] to-[#252536] rounded-lg border border-[#3a3a4e] p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <FiBarChart2 className="text-indigo-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white">Pseudocódigo Analizado</h3>
              </div>
              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e] max-h-64 overflow-auto">
                <pre className="text-white font-mono text-sm whitespace-pre-wrap break-words">
                  {selectedItem.convertedPseudocode}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowSystemAnalysisPage;

