import { useMemo, useEffect, useState } from 'react';
import ReactFlow, {
  ConnectionMode,
  MarkerType,
} from 'reactflow';
import type { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import NodeForAnalysisResultComponent from './NodeForAnalysisResultComponent';
import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';
import { CompleteCodeService } from '../services/CompleteCodeService';
import type { NodeStatus } from './NodeForAnalysisResultComponent';

const nodeTypes = {
  custom: NodeForAnalysisResultComponent,
};

function AnalysisResultsComponent() {
  const { selectedItem, executeAnalysisInThisMoment, updateItem, setExecuteAnalysisInThisMoment } = usePseudocodeAnalysis();
  const [generatorStatus, setGeneratorStatus] = useState<NodeStatus>('not_started');
  const [isConverting, setIsConverting] = useState(false);

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
        data: { title: 'Análisis por sistema', status: 'not_started' },
      },
      {
        id: 'nieto2',
        type: 'custom',
        position: { x: 590, y: 430 },
        data: { title: 'Análisis por LLM', status: 'not_started' },
      },
      {
        id: 'central',
        type: 'custom',
        position: { x: 340, y: 420 },
        data: { title: 'Comparación de resultados', status: 'not_started' },
      },
    ],
    [generatorStatus]
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

