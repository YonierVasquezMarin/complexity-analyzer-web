import { useMemo } from 'react';
import ReactFlow, {
  ConnectionMode,
} from 'reactflow';
import type { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import NodeForAnalysisResultComponent from './NodeForAnalysisResultComponent';

const nodeTypes = {
  custom: NodeForAnalysisResultComponent,
};

function AnalysisResultsComponent() {
  // Dimensiones de los nodos
  const nodeWidth = 120;
  const nodeHeight = 60;

  // Definición de nodos
  const nodes = useMemo<Node[]>(
    () => [
      {
        id: 'padre',
        type: 'custom',
        position: { x: 340, y: 40 },
        data: { title: 'Padre', width: nodeWidth, height: nodeHeight },
      },
      {
        id: 'hijo',
        type: 'custom',
        position: { x: 340, y: 250 },
        data: { title: 'Hijo', width: nodeWidth, height: nodeHeight },
      },
      {
        id: 'nieto1',
        type: 'custom',
        position: { x: 90, y: 450 },
        data: { title: 'Nieto 1', width: nodeWidth, height: nodeHeight },
      },
      {
        id: 'nieto2',
        type: 'custom',
        position: { x: 590, y: 450 },
        data: { title: 'Nieto 2', width: nodeWidth, height: nodeHeight },
      },
      {
        id: 'central',
        type: 'custom',
        position: { x: 340, y: 450 },
        data: { title: 'Central', width: nodeWidth, height: nodeHeight },
      },
    ],
    [nodeWidth, nodeHeight]
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
      },
      {
        id: 'hijo-nieto1',
        source: 'hijo',
        target: 'nieto1',
        type: 'straight',
        sourceHandle: 'left',
        targetHandle: 'top',
        animated: false,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
      },
      {
        id: 'hijo-nieto2',
        source: 'hijo',
        target: 'nieto2',
        type: 'straight',
        sourceHandle: 'right',
        targetHandle: 'top',
        animated: false,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
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
        fitView
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
        `}</style>
      </ReactFlow>
    </div>
  );
}

export default AnalysisResultsComponent;

