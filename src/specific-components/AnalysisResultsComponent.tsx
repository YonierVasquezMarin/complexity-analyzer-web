import { useMemo } from 'react';
import ReactFlow, {
  ConnectionMode,
  MarkerType,
} from 'reactflow';
import type { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import NodeForAnalysisResultComponent from './NodeForAnalysisResultComponent';

const nodeTypes = {
  custom: NodeForAnalysisResultComponent,
};

function AnalysisResultsComponent() {
  // Definición de nodos
  const nodes = useMemo<Node[]>(
    () => [
      {
        id: 'padre',
        type: 'custom',
        position: { x: 340, y: 40 },
        data: { title: 'Pseudocódio', status: 'completed' },
      },
      {
        id: 'hijo',
        type: 'custom',
        position: { x: 340, y: 250 },
        data: { title: 'Generador de pseudocódigo', status: 'in_progress' },
      },
      {
        id: 'nieto1',
        type: 'custom',
        position: { x: 90, y: 450 },
        data: { title: 'Análisis por sistema', status: 'not_started' },
      },
      {
        id: 'nieto2',
        type: 'custom',
        position: { x: 590, y: 450 },
        data: { title: 'Análisis por LLM', status: 'in_progress' },
      },
      {
        id: 'central',
        type: 'custom',
        position: { x: 340, y: 440 },
        data: { title: 'Comparación de resultados', status: 'not_started' },
      },
    ],
    []
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

