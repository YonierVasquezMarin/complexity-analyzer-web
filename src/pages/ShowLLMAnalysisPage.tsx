import { useEffect, useRef } from 'react';
import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';
import EmptyStateComponent from '../shared/EmptyStateComponent';
import { 
  FiCpu, 
  FiZap, 
  FiTarget, 
  FiList, 
  FiLayers, 
  FiTrendingUp,
  FiCheckCircle,
  FiXCircle,
  FiCode,
  FiBarChart2,
  FiInfo,
  FiActivity,
  FiHash
} from 'react-icons/fi';
import SelectedItemNameComponent from '../components/SelectedItemNameComponent';
import LatexRenderer from '../components/LatexRenderer';

// Componente para renderizar diagramas Mermaid
function MermaidDiagram({ diagram, id }: { diagram: string; id: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mermaidInitialized = useRef(false);
  const renderKeyRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current || !diagram) return;

    let isMounted = true;

    const renderMermaid = async () => {
      try {
        // Limpiar el contenedor primero
        if (containerRef.current && isMounted) {
          containerRef.current.innerHTML = '';
        }

        // Intentar cargar mermaid dinámicamente
        const mermaid = await import('mermaid');
        
        // Inicializar Mermaid solo una vez
        if (!mermaidInitialized.current) {
          mermaid.default.initialize({ 
            startOnLoad: false,
            theme: 'dark',
            securityLevel: 'loose',
            fontFamily: 'monospace',
            logLevel: 'error',
          });
          mermaidInitialized.current = true;
        }
        
        if (!isMounted || !containerRef.current) return;
        
        // Crear un ID único para este diagrama
        renderKeyRef.current += 1;
        const uniqueId = `mermaid-${id}-${renderKeyRef.current}`;
        
        // Crear el elemento contenedor directamente en el DOM
        const element = document.createElement('div');
        element.id = uniqueId;
        element.className = 'mermaid';
        // Usar textContent para evitar problemas con HTML
        element.textContent = diagram.trim();
        
        // Asegurarse de que el contenedor esté en el DOM
        containerRef.current.appendChild(element);
        
        // Esperar a que el elemento esté completamente en el DOM y tenga dimensiones
        await new Promise(resolve => {
          const checkElement = () => {
            if (element.getBoundingClientRect().width > 0 || element.getBoundingClientRect().height > 0) {
              resolve(undefined);
            } else {
              requestAnimationFrame(checkElement);
            }
          };
          requestAnimationFrame(checkElement);
        });
        
        // Esperar un frame adicional para asegurar que esté completamente renderizado
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        if (!isMounted) return;
        
        // Renderizar el diagrama usando render en lugar de run
        const { svg } = await mermaid.default.render(uniqueId, diagram.trim());
        
        if (isMounted && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
        // Fallback: mostrar el código del diagrama
        if (isMounted && containerRef.current) {
          const escapedDiagram = diagram
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          containerRef.current.innerHTML = `
            <div class="p-4 bg-[#1e1e2e] rounded border border-[#3a3a4e]">
              <p class="text-yellow-400 text-sm mb-2">⚠️ No se pudo renderizar el diagrama Mermaid</p>
              <pre class="text-white font-mono text-xs overflow-auto"><code>${escapedDiagram}</code></pre>
            </div>
          `;
        }
      }
    };

    // Usar un pequeño delay para asegurar que el componente esté montado
    const timer = setTimeout(() => {
      renderMermaid();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      // Limpiar el contenedor al desmontar
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [diagram, id]);

  return (
    <div 
      ref={containerRef} 
      className="w-full min-h-[200px] flex items-center justify-center bg-[#1e1e2e] rounded border border-[#3a3a4e] p-4"
    />
  );
}

function ShowLLMAnalysisPage() {
  const { selectedItem } = usePseudocodeAnalysis();

  // Si no hay item seleccionado, mostrar estado vacío
  if (!selectedItem) {
    return (
      <div className="w-full h-screen bg-[#1e1e2e] flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white">Análisis por LLM</h2>
        </div>
        <EmptyStateComponent
          icon={<FiActivity size={80} />}
          label="Selecciona un archivo para ver el análisis"
        />
      </div>
    );
  }

  // Si no hay llmAnalysis, mostrar mensaje
  if (!selectedItem.llmAnalysis) {
    return (
      <div className="w-full h-screen bg-[#1e1e2e] flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white">Análisis por LLM</h2>
        </div>
        <EmptyStateComponent
          icon={<FiActivity size={80} />}
          label="Este archivo aún no tiene análisis por LLM"
        />
      </div>
    );
  }

  const { llmAnalysis } = selectedItem;

  return (
    <div className="w-full h-screen bg-[#1e1e2e] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[#3a3a4e] flex-shrink-0 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Análisis por LLM</h2>
          <p className="text-sm text-gray-400">Análisis completo de complejidad algorítmica con inteligencia artificial</p>
        </div>
        <SelectedItemNameComponent variant="header" />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Notaciones Big O Básicas */}
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
                  O({llmAnalysis.basic_complexity.O})
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
                  Ω({llmAnalysis.basic_complexity.Omega})
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
                  Θ({llmAnalysis.basic_complexity.Theta})
                </code>
              </div>
            </div>
          </div>

          {/* Resumen y Tight Bound */}
          <div className="bg-gradient-to-br from-[#2a2a3e] to-[#252536] rounded-lg border border-[#3a3a4e] p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <FiInfo className="text-indigo-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">Resumen de Complejidad</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                <p className="text-white text-sm leading-relaxed">{llmAnalysis.basic_complexity.summary}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-300">Cota Ajustada:</span>
                {llmAnalysis.basic_complexity.tight_bound ? (
                  <>
                    <FiCheckCircle className="text-green-400" size={20} />
                    <span className="text-green-400 font-semibold">Sí</span>
                  </>
                ) : (
                  <>
                    <FiXCircle className="text-gray-500" size={20} />
                    <span className="text-gray-400 font-semibold">No</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Análisis Paso a Paso */}
          {llmAnalysis.step_by_step_analysis && llmAnalysis.step_by_step_analysis.length > 0 && (
            <div className="bg-gradient-to-br from-[#2a2a3e] to-[#252536] rounded-lg border border-[#3a3a4e] p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <FiList className="text-yellow-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white">Análisis Paso a Paso</h3>
              </div>
              <div className="space-y-4">
                {llmAnalysis.step_by_step_analysis.map((step, index) => (
                  <div key={index} className="bg-[#1e1e2e] rounded-lg p-5 border border-[#3a3a4e]">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <span className="text-blue-400 font-bold text-sm">{step.step}</span>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <code className="text-blue-400 font-mono text-sm bg-[#252536] px-3 py-1 rounded block mb-2">
                            {step.code_line}
                          </code>
                        </div>
                        <div>
                          <p className="text-white text-sm mb-2">{step.explanation}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="bg-[#252536] rounded p-3">
                            <span className="text-xs text-gray-400 block mb-1">Ejecuciones:</span>
                            <span className="text-white font-mono text-sm">{step.executions}</span>
                          </div>
                          <div className="bg-[#252536] rounded p-3">
                            <span className="text-xs text-gray-400 block mb-1">Contribución:</span>
                            <span className="text-white font-mono text-sm">{step.complexity_contribution}</span>
                          </div>
                        </div>
                        {step.detailed_reasoning && (
                          <div className="bg-[#252536] rounded p-3 mt-2">
                            <span className="text-xs text-gray-400 block mb-1">Razonamiento Detallado:</span>
                            <p className="text-gray-300 text-sm">{step.detailed_reasoning}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clasificación de Patrones */}
          <div className="bg-gradient-to-br from-[#2a2a3e] to-[#252536] rounded-lg border border-[#3a3a4e] p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-pink-500/20 rounded-lg">
                <FiLayers className="text-pink-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">Clasificación de Patrones</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-300">Patrón Primario:</span>
                  <span className="text-white font-bold">{llmAnalysis.pattern_classification.primary_pattern}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Confianza:</span>
                  <div className="flex-1 bg-[#252536] rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-pink-400 h-full transition-all"
                      style={{ width: `${llmAnalysis.pattern_classification.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-white font-semibold">
                    {(llmAnalysis.pattern_classification.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              {llmAnalysis.pattern_classification.characteristics && llmAnalysis.pattern_classification.characteristics.length > 0 && (
                <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                  <span className="text-sm font-semibold text-gray-300 block mb-2">Características:</span>
                  <ul className="space-y-1">
                    {llmAnalysis.pattern_classification.characteristics.map((char, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-pink-400 mt-1">•</span>
                        <span className="text-white text-sm">{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {llmAnalysis.pattern_classification.similar_algorithms && llmAnalysis.pattern_classification.similar_algorithms.length > 0 && (
                <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                  <span className="text-sm font-semibold text-gray-300 block mb-2">Algoritmos Similares:</span>
                  <div className="flex flex-wrap gap-2">
                    {llmAnalysis.pattern_classification.similar_algorithms.map((algo, idx) => (
                      <span key={idx} className="bg-[#252536] text-white text-sm px-3 py-1 rounded">
                        {algo}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {llmAnalysis.pattern_classification.alternative_approaches && (
                <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                  <span className="text-sm font-semibold text-gray-300 block mb-2">Enfoques Alternativos:</span>
                  <p className="text-white text-sm">{llmAnalysis.pattern_classification.alternative_approaches}</p>
                </div>
              )}
            </div>
          </div>

          {/* Representación Matemática */}
          <div className="bg-gradient-to-br from-[#2a2a3e] to-[#252536] rounded-lg border border-[#3a3a4e] p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <FiHash className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">Representación Matemática</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                <span className="text-sm font-semibold text-gray-300 block mb-2">Tipo:</span>
                <span className="text-white font-mono">{llmAnalysis.mathematical_representation.type}</span>
              </div>

              {llmAnalysis.mathematical_representation.recurrence_relation && (
                <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                  <span className="text-sm font-semibold text-gray-300 block mb-2">Relación de Recurrencia:</span>
                  <code className="text-white font-mono text-sm block bg-[#252536] px-3 py-2 rounded">
                    {llmAnalysis.mathematical_representation.recurrence_relation}
                  </code>
                </div>
              )}

              {llmAnalysis.mathematical_representation.base_case && (
                <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                  <span className="text-sm font-semibold text-gray-300 block mb-2">Caso Base:</span>
                  <code className="text-white font-mono text-sm block bg-[#252536] px-3 py-2 rounded">
                    {llmAnalysis.mathematical_representation.base_case}
                  </code>
                </div>
              )}

              {llmAnalysis.mathematical_representation.solution_method && (
                <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                  <span className="text-sm font-semibold text-gray-300 block mb-2">Método de Solución:</span>
                  <span className="text-white text-sm">{llmAnalysis.mathematical_representation.solution_method}</span>
                </div>
              )}

              {llmAnalysis.mathematical_representation.solution_steps && llmAnalysis.mathematical_representation.solution_steps.length > 0 && (
                <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                  <span className="text-sm font-semibold text-gray-300 block mb-2">Pasos de Solución:</span>
                  <ol className="list-decimal list-inside space-y-2">
                    {llmAnalysis.mathematical_representation.solution_steps.map((step, idx) => (
                      <li key={idx} className="text-white text-sm">
                        <code className="bg-[#252536] px-2 py-1 rounded">{step}</code>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {llmAnalysis.mathematical_representation.summation && (
                <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                  <span className="text-sm font-semibold text-gray-300 block mb-2">Sumatoria:</span>
                  <code className="text-white font-mono text-sm block bg-[#252536] px-3 py-2 rounded">
                    {llmAnalysis.mathematical_representation.summation}
                  </code>
                </div>
              )}

              {llmAnalysis.mathematical_representation.expansion && (
                <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                  <span className="text-sm font-semibold text-gray-300 block mb-2">Expansión:</span>
                  <code className="text-white font-mono text-sm block bg-[#252536] px-3 py-2 rounded">
                    {llmAnalysis.mathematical_representation.expansion}
                  </code>
                </div>
              )}

              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                <span className="text-sm font-semibold text-gray-300 block mb-2">Resultado Final:</span>
                <code className="text-cyan-400 font-mono text-lg font-bold block bg-[#252536] px-3 py-2 rounded">
                  {llmAnalysis.mathematical_representation.final_result}
                </code>
              </div>

              {llmAnalysis.mathematical_representation.latex_notation && (
                <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                  <span className="text-sm font-semibold text-gray-300 block mb-2">Notación LaTeX:</span>
                  <div className="bg-[#252536] px-3 py-2 rounded overflow-x-auto w-full max-w-full">
                    <LatexRenderer 
                      latex={llmAnalysis.mathematical_representation.latex_notation} 
                      displayMode={true}
                      className="text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Diagramas de Ejecución */}
          {llmAnalysis.execution_diagram && (
            <div className="bg-gradient-to-br from-[#2a2a3e] to-[#252536] rounded-lg border border-[#3a3a4e] p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <FiBarChart2 className="text-emerald-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white">Diagramas de Ejecución</h3>
              </div>
              <div className="space-y-6">
                {/* Árbol de Recursión */}
                {llmAnalysis.execution_diagram.recursion_tree && (
                  <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <FiCode className="text-emerald-400" size={20} />
                      Árbol de Recursión
                    </h4>
                    {llmAnalysis.execution_diagram.recursion_tree.diagram && (
                      <MermaidDiagram 
                        diagram={llmAnalysis.execution_diagram.recursion_tree.diagram} 
                        id="recursion-tree"
                      />
                    )}
                    {llmAnalysis.execution_diagram.recursion_tree.depth && (
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-[#252536] rounded p-3">
                          <span className="text-xs text-gray-400 block mb-1">Profundidad:</span>
                          <span className="text-white font-mono">{llmAnalysis.execution_diagram.recursion_tree.depth}</span>
                        </div>
                        {llmAnalysis.execution_diagram.recursion_tree.total_work && (
                          <div className="bg-[#252536] rounded p-3">
                            <span className="text-xs text-gray-400 block mb-1">Trabajo Total:</span>
                            <span className="text-white font-mono text-sm">{llmAnalysis.execution_diagram.recursion_tree.total_work}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Diagrama de Flujo */}
                {llmAnalysis.execution_diagram.flowchart && (
                  <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <FiTrendingUp className="text-emerald-400" size={20} />
                      Diagrama de Flujo
                    </h4>
                    {llmAnalysis.execution_diagram.flowchart.diagram && (
                      <MermaidDiagram 
                        diagram={llmAnalysis.execution_diagram.flowchart.diagram} 
                        id="flowchart"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Análisis de Costos */}
          {llmAnalysis.cost_analysis && (
            <div className="bg-gradient-to-br from-[#2a2a3e] to-[#252536] rounded-lg border border-[#3a3a4e] p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <FiTrendingUp className="text-orange-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white">Análisis de Costos</h3>
              </div>
              <div className="space-y-4">
                {/* Desglose por Instrucción */}
                {llmAnalysis.cost_analysis.instruction_breakdown && llmAnalysis.cost_analysis.instruction_breakdown.length > 0 && (
                  <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                    <h4 className="text-sm font-semibold text-gray-300 mb-4">Desglose por Instrucción</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[#3a3a4e]">
                            <th className="text-left text-gray-400 p-2">Línea</th>
                            <th className="text-left text-gray-400 p-2">Código</th>
                            <th className="text-left text-gray-400 p-2">Tipo</th>
                            <th className="text-left text-gray-400 p-2">Ejecuciones</th>
                            <th className="text-left text-gray-400 p-2">Tiempo/ejec (μs)</th>
                            <th className="text-left text-gray-400 p-2">Fórmula Total</th>
                            <th className="text-left text-gray-400 p-2">n=1000</th>
                          </tr>
                        </thead>
                        <tbody>
                          {llmAnalysis.cost_analysis.instruction_breakdown.map((item, idx) => (
                            <tr key={idx} className="border-b border-[#3a3a4e] hover:bg-[#252536]">
                              <td className="text-white p-2 font-mono">{item.line}</td>
                              <td className="text-white p-2">
                                <code className="text-xs bg-[#252536] px-2 py-1 rounded">{item.code}</code>
                              </td>
                              <td className="text-gray-300 p-2">{item.operation_type}</td>
                              <td className="text-white p-2 font-mono text-xs">{item.executions_count}</td>
                              <td className="text-white p-2 font-mono">{item.time_per_execution_us}</td>
                              <td className="text-white p-2 font-mono text-xs">{item.total_time_formula}</td>
                              <td className="text-white p-2 font-mono text-xs">{item.total_time_n_1000}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Resumen de Costos */}
                {llmAnalysis.cost_analysis.summary && (
                  <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                    <h4 className="text-sm font-semibold text-gray-300 mb-4">Resumen de Costos</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div className="bg-[#252536] rounded p-3">
                        <span className="text-xs text-gray-400 block mb-1">Fórmula Total:</span>
                        <code className="text-white font-mono text-sm">{llmAnalysis.cost_analysis.summary.total_time_formula}</code>
                      </div>
                      <div className="bg-[#252536] rounded p-3">
                        <span className="text-xs text-gray-400 block mb-1">n = 10:</span>
                        <span className="text-white font-mono text-sm">{llmAnalysis.cost_analysis.summary.for_n_10}</span>
                      </div>
                      <div className="bg-[#252536] rounded p-3">
                        <span className="text-xs text-gray-400 block mb-1">n = 100:</span>
                        <span className="text-white font-mono text-sm">{llmAnalysis.cost_analysis.summary.for_n_100}</span>
                      </div>
                      <div className="bg-[#252536] rounded p-3">
                        <span className="text-xs text-gray-400 block mb-1">n = 1,000:</span>
                        <span className="text-white font-mono text-sm">{llmAnalysis.cost_analysis.summary.for_n_1000}</span>
                      </div>
                      <div className="bg-[#252536] rounded p-3">
                        <span className="text-xs text-gray-400 block mb-1">n = 10,000:</span>
                        <span className="text-white font-mono text-sm">{llmAnalysis.cost_analysis.summary.for_n_10000}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Metadatos del LLM */}
          <div className="bg-gradient-to-br from-[#2a2a3e] to-[#252536] rounded-lg border border-[#3a3a4e] p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-violet-500/20 rounded-lg">
                <FiInfo className="text-violet-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">Metadatos del LLM</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                <span className="text-xs text-gray-400 block mb-1">Modelo:</span>
                <span className="text-white font-semibold">{llmAnalysis.llm_metadata.model_used}</span>
              </div>
              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                <span className="text-xs text-gray-400 block mb-1">Tokens de Entrada:</span>
                <span className="text-white font-mono">{llmAnalysis.llm_metadata.tokens.input.toLocaleString()}</span>
              </div>
              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                <span className="text-xs text-gray-400 block mb-1">Tokens de Salida:</span>
                <span className="text-white font-mono">{llmAnalysis.llm_metadata.tokens.output.toLocaleString()}</span>
              </div>
              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                <span className="text-xs text-gray-400 block mb-1">Total de Tokens:</span>
                <span className="text-white font-mono font-semibold">{llmAnalysis.llm_metadata.tokens.total.toLocaleString()}</span>
              </div>
              {llmAnalysis.llm_metadata.estimated_cost_usd && (
                <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                  <span className="text-xs text-gray-400 block mb-1">Costo Estimado:</span>
                  <span className="text-white font-semibold">${llmAnalysis.llm_metadata.estimated_cost_usd.toFixed(4)}</span>
                </div>
              )}
              {llmAnalysis.llm_metadata.processing_time_ms && (
                <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e]">
                  <span className="text-xs text-gray-400 block mb-1">Tiempo de Procesamiento:</span>
                  <span className="text-white font-mono">{llmAnalysis.llm_metadata.processing_time_ms} ms</span>
                </div>
              )}
            </div>
          </div>

          {/* Pseudocódigo Analizado (referencia) */}
          {llmAnalysis.pseudocode && (
            <div className="bg-gradient-to-br from-[#2a2a3e] to-[#252536] rounded-lg border border-[#3a3a4e] p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <FiCode className="text-indigo-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white">Pseudocódigo Analizado</h3>
              </div>
              <div className="bg-[#1e1e2e] rounded-lg p-4 border border-[#3a3a4e] max-h-64 overflow-auto">
                <pre className="text-white font-mono text-sm whitespace-pre-wrap break-words">
                  {llmAnalysis.pseudocode}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowLLMAnalysisPage;

