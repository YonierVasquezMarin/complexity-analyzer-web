import { useMemo, useEffect, useState, useRef } from 'react';
import ReactFlow, {
  ConnectionMode,
  MarkerType,
} from 'reactflow';
import type { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import NodeForAnalysisResultComponent from './NodeForAnalysisResultComponent';
import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';
import { CompleteCodeService } from '../services/CompleteCodeService';
import { AnalyzeBySystemService } from '../services/AnalyzeBySystemService';
import { AnalyzeByLLMService } from '../services/AnalyzeByLLMService';
import type { NodeStatus } from './NodeForAnalysisResultComponent';

const nodeTypes = {
  custom: NodeForAnalysisResultComponent,
};

function AnalysisResultsComponent() {
  const { selectedItem, executeAnalysisInThisMoment, updateItem, setExecuteAnalysisInThisMoment } = usePseudocodeAnalysis();
  const [generatorStatus, setGeneratorStatus] = useState<NodeStatus>('not_started');
  const [systemAnalysisStatus, setSystemAnalysisStatus] = useState<NodeStatus>('not_started');
  const [llmAnalysisStatus, setLlmAnalysisStatus] = useState<NodeStatus>('not_started');
  const [isConverting, setIsConverting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzingLLM, setIsAnalyzingLLM] = useState(false);
  const hasCleanedRef = useRef(false);

  // Actualizar el estado del generador cuando cambia el item seleccionado (solo si no está convirtiendo)
  useEffect(() => {
    if (isConverting) {
      return; // No actualizar el estado si está en proceso de conversión
    }

    if (selectedItem?.convertedPseudocode && selectedItem.convertedPseudocode.trim() !== '') {
      setGeneratorStatus('completed');
    } else {
      setGeneratorStatus('not_started');
    }
  }, [selectedItem, isConverting]);

  // Actualizar el estado del análisis por sistema cuando cambia el item seleccionado (solo si no está analizando)
  useEffect(() => {
    if (isAnalyzing) {
      return; // No actualizar el estado si está en proceso de análisis
    }

    if (selectedItem?.systemAnalysis) {
      setSystemAnalysisStatus('completed');
    } else {
      setSystemAnalysisStatus('not_started');
    }
  }, [selectedItem, isAnalyzing]);

  // Actualizar el estado del análisis por LLM cuando cambia el item seleccionado (solo si no está analizando)
  useEffect(() => {
    if (isAnalyzingLLM) {
      return; // No actualizar el estado si está en proceso de análisis
    }

    if (selectedItem?.llmAnalysis) {
      setLlmAnalysisStatus('completed');
    } else {
      setLlmAnalysisStatus('not_started');
    }
  }, [selectedItem, isAnalyzingLLM]);

  // Efecto para limpiar los datos del análisis cuando executeAnalysisInThisMoment es true
  useEffect(() => {
    if (!executeAnalysisInThisMoment || !selectedItem) {
      // Resetear el flag cuando executeAnalysisInThisMoment es false
      if (!executeAnalysisInThisMoment) {
        hasCleanedRef.current = false;
      }
      return;
    }

    // Verificar si ya se limpió en este ciclo para evitar loops infinitos
    if (hasCleanedRef.current) {
      return;
    }

    // Verificar si realmente necesita limpiar (si ya está limpio, no hacer nada)
    const needsCleaning = selectedItem.convertedPseudocode !== undefined || selectedItem.systemAnalysis !== undefined || selectedItem.llmAnalysis !== undefined;
    if (!needsCleaning) {
      hasCleanedRef.current = true;
      return;
    }

    // Marcar que ya se limpió
    hasCleanedRef.current = true;

    // Limpiar los datos del análisis del backend
    const cleanedItem = {
      ...selectedItem,
      convertedPseudocode: undefined,
      systemAnalysis: undefined,
      llmAnalysis: undefined,
    };
    updateItem(cleanedItem);

    // Resetear los estados de los nodos
    setGeneratorStatus('not_started');
    setSystemAnalysisStatus('not_started');
    setLlmAnalysisStatus('not_started');
  }, [executeAnalysisInThisMoment, selectedItem, updateItem]);

  // Efecto para manejar la conversión de pseudocódigo cuando executeAnalysisInThisMoment es true
  useEffect(() => {
    if (!executeAnalysisInThisMoment || !selectedItem) {
      return;
    }

    const convertPseudocode = async () => {
      // Marcar como in_progress y establecer flag de conversión
      setGeneratorStatus('in_progress');
      setIsConverting(true);

      try {
        // Llamar al servicio para completar el código
        const response = await CompleteCodeService.completeCode({
          pseudocode: selectedItem.pseudocode,
        });

        // Actualizar el item con el pseudocódigo convertido
        const updatedItem = {
          ...selectedItem,
          convertedPseudocode: response.pseudocode,
        };
        updateItem(updatedItem);

        // Marcar como completado y quitar flag de conversión
        setGeneratorStatus('completed');
        setIsConverting(false);
        // Limpiar el flag de ejecución después de completar
        setExecuteAnalysisInThisMoment(false);
      } catch (error) {
        console.error('Error al completar el código:', error);
        // En caso de error, mantener el estado como not_started y quitar flag de conversión
        setGeneratorStatus('not_started');
        setIsConverting(false);
        // Limpiar el flag de ejecución incluso en caso de error
        setExecuteAnalysisInThisMoment(false);
      }
    };

    // Usar un pequeño delay para asegurar que el estado se haya propagado completamente
    const timer = setTimeout(() => {
      convertPseudocode();
    }, 50);

    return () => clearTimeout(timer);
  }, [executeAnalysisInThisMoment, selectedItem, updateItem, setExecuteAnalysisInThisMoment]);

  // Efecto para manejar el análisis por sistema cuando el pseudocódigo convertido esté disponible
  useEffect(() => {
    // Si executeAnalysisInThisMoment es false, no ejecutar análisis (solo ver resultados)
    if (!executeAnalysisInThisMoment) {
      return;
    }

    if (!selectedItem || !selectedItem.convertedPseudocode || selectedItem.convertedPseudocode.trim() === '') {
      return;
    }

    // Si ya tiene análisis guardado, no volver a analizar
    if (selectedItem.systemAnalysis) {
      return;
    }

    // Si está analizando o convirtiendo, no hacer nada
    if (isAnalyzing || isConverting) {
      return;
    }

    const analyzeBySystem = async () => {
      // Marcar como in_progress y establecer flag de análisis
      setSystemAnalysisStatus('in_progress');
      setIsAnalyzing(true);

      try {
        // Llamar al servicio para analizar el código
        const analysisResponse = await AnalyzeBySystemService.analyzeBySystem({
          pseudocode: selectedItem.convertedPseudocode!,
        });

        // Actualizar el item con el resultado del análisis
        const updatedItem = {
          ...selectedItem,
          systemAnalysis: analysisResponse,
        };
        updateItem(updatedItem);

        // Marcar como completado y quitar flag de análisis
        setSystemAnalysisStatus('completed');
        setIsAnalyzing(false);
      } catch (error) {
        console.error('Error al analizar el código por sistema:', error);
        // En caso de error, mantener el estado como not_started y quitar flag de análisis
        setSystemAnalysisStatus('not_started');
        setIsAnalyzing(false);
      }
    };

    // Usar un pequeño delay para asegurar que el estado se haya propagado completamente
    const timer = setTimeout(() => {
      analyzeBySystem();
    }, 50);

    return () => clearTimeout(timer);
  }, [executeAnalysisInThisMoment, selectedItem, isAnalyzing, isConverting, updateItem]);

  // Efecto para manejar el análisis por LLM cuando el pseudocódigo convertido esté disponible
  useEffect(() => {
    // Si executeAnalysisInThisMoment es false, no ejecutar análisis (solo ver resultados)
    if (!executeAnalysisInThisMoment) {
      return;
    }

    if (!selectedItem || !selectedItem.convertedPseudocode || selectedItem.convertedPseudocode.trim() === '') {
      return;
    }

    // Si ya tiene análisis guardado, no volver a analizar
    if (selectedItem.llmAnalysis) {
      return;
    }

    // Si está analizando o convirtiendo, no hacer nada
    if (isAnalyzingLLM || isConverting) {
      return;
    }

    const analyzeByLLM = async () => {
      // Marcar como in_progress y establecer flag de análisis
      setLlmAnalysisStatus('in_progress');
      setIsAnalyzingLLM(true);

      try {
        // Llamar al servicio para analizar el código con LLM
        const analysisResponse = await AnalyzeByLLMService.analyzeByLLM({
          pseudocode: selectedItem.convertedPseudocode!,
        });

        // Actualizar el item con el resultado del análisis
        const updatedItem = {
          ...selectedItem,
          llmAnalysis: analysisResponse,
        };
        updateItem(updatedItem);

        // Marcar como completado y quitar flag de análisis
        setLlmAnalysisStatus('completed');
        setIsAnalyzingLLM(false);
      } catch (error) {
        console.error('Error al analizar el código por LLM:', error);
        // En caso de error, mantener el estado como not_started y quitar flag de análisis
        setLlmAnalysisStatus('not_started');
        setIsAnalyzingLLM(false);
      }
    };

    // Usar un pequeño delay para asegurar que el estado se haya propagado completamente
    const timer = setTimeout(() => {
      analyzeByLLM();
    }, 50);

    return () => clearTimeout(timer);
  }, [executeAnalysisInThisMoment, selectedItem, isAnalyzingLLM, isConverting, updateItem]);

  // Definición de nodos
  const nodes = useMemo<Node[]>(
    () => [
      {
        id: 'padre',
        type: 'custom',
        position: { x: 340, y: 20 },
        data: { title: 'Pseudocódio', status: 'completed' },
      },
      {
        id: 'hijo',
        type: 'custom',
        position: { x: 340, y: 230 },
        data: { title: 'Generador de pseudocódigo', status: generatorStatus },
      },
      {
        id: 'nieto1',
        type: 'custom',
        position: { x: 90, y: 430 },
        data: { title: 'Análisis por sistema', status: systemAnalysisStatus },
      },
      {
        id: 'nieto2',
        type: 'custom',
        position: { x: 590, y: 430 },
        data: { title: 'Análisis por LLM', status: llmAnalysisStatus },
      },
      {
        id: 'central',
        type: 'custom',
        position: { x: 340, y: 420 },
        data: { title: 'Comparación de resultados', status: 'not_started' },
      },
    ],
    [generatorStatus, systemAnalysisStatus, llmAnalysisStatus]
  );

  // Definición de conexiones (edges)
  const edges = useMemo<Edge[]>(
    () => [
      {
        id: 'padre-hijo',
        source: 'padre',
        target: 'hijo',
        type: 'straight',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        animated: false,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
        },
      },
      {
        id: 'hijo-nieto1',
        source: 'hijo',
        target: 'nieto1',
        type: 'step',
        sourceHandle: 'left',
        targetHandle: 'top',
        animated: false,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
        },
      },
      {
        id: 'hijo-nieto2',
        source: 'hijo',
        target: 'nieto2',
        type: 'step',
        sourceHandle: 'right',
        targetHandle: 'top',
        animated: false,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
        },
      },
      {
        id: 'nieto1-central',
        source: 'nieto1',
        target: 'central',
        type: 'straight',
        sourceHandle: 'right',
        targetHandle: 'left-target',
        animated: false,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
        },
      },
      {
        id: 'nieto2-central',
        source: 'nieto2',
        target: 'central',
        type: 'straight',
        sourceHandle: 'left',
        targetHandle: 'right-target',
        animated: false,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
        },
      },
    ],
    []
  );

  return (
    <div className="w-full h-full bg-gray-300">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        nodesConnectable={false}
        edgesUpdatable={false}
        elementsSelectable={false}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        style={{ background: '#d1d5db' }}
      >
        <style>{`
          .react-flow__attribution {
            display: none !important;
          }
          .react-flow__handle {
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
            cursor: default !important;
            pointer-events: none !important;
          }
          .react-flow__node {
            cursor: pointer !important;
          }
          .react-flow__pane {
            cursor: default !important;
          }
        `}</style>
      </ReactFlow>
    </div>
  );
}

export default AnalysisResultsComponent;

