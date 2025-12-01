import NodeForAnalysisResultComponent from './NodeForAnalysisResultComponent';

function AnalysisResultsComponent() {
  // Dimensiones del contenedor SVG
  const svgWidth = 800;
  const svgHeight = 600;
  
  // Posiciones de los nodos
  const padreX = svgWidth / 2;
  const padreY = 70;
  
  const hijoX = svgWidth / 2;
  const hijoY = 280;
  
  const nieto1X = svgWidth / 2 - 250;
  const nieto1Y = 480;
  
  const nieto2X = svgWidth / 2 + 250;
  const nieto2Y = 480;
  
  const centralX = svgWidth / 2;
  const centralY = 480;
  
  // Dimensiones de los nodos
  const nodeWidth = 120;
  const nodeHeight = 60;
  
  return (
    <div className="w-full h-full bg-gray-300 p-4 flex items-center justify-center">
      <svg width={svgWidth} height={svgHeight}>
        {/* Flecha del padre al hijo */}
        <path
          d={`M ${padreX} ${padreY + nodeHeight / 2} 
              Q ${padreX} ${(padreY + hijoY) / 2} 
                ${hijoX} ${hijoY - nodeHeight / 2}`}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
        
        {/* Flecha del hijo al nieto 1 */}
        <path
          d={`M ${hijoX - nodeWidth / 4} ${hijoY + nodeHeight / 2} 
              Q ${(hijoX + nieto1X) / 2} ${(hijoY + nieto1Y) / 2} 
                ${nieto1X} ${nieto1Y - nodeHeight / 2}`}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
        
        {/* Flecha del hijo al nieto 2 */}
        <path
          d={`M ${hijoX + nodeWidth / 4} ${hijoY + nodeHeight / 2} 
              Q ${(hijoX + nieto2X) / 2} ${(hijoY + nieto2Y) / 2} 
                ${nieto2X} ${nieto2Y - nodeHeight / 2}`}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
        
        {/* Flecha del nieto 1 al nodo central */}
        <line
          x1={nieto1X + nodeWidth / 2}
          y1={nieto1Y}
          x2={centralX - nodeWidth / 2}
          y2={centralY}
          stroke="#3b82f6"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
        
        {/* Flecha del nieto 2 al nodo central */}
        <line
          x1={nieto2X - nodeWidth / 2}
          y1={nieto2Y}
          x2={centralX + nodeWidth / 2}
          y2={centralY}
          stroke="#3b82f6"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
        
        {/* Definición de la punta de flecha */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M 0 0 L 8 4 L 0 8 z" fill="#3b82f6" />
          </marker>
        </defs>
        
        {/* Nodo Padre */}
        <NodeForAnalysisResultComponent
          x={padreX}
          y={padreY}
          title="Padre"
          width={nodeWidth}
          height={nodeHeight}
        />
        
        {/* Nodo Hijo */}
        <NodeForAnalysisResultComponent
          x={hijoX}
          y={hijoY}
          title="Hijo"
          width={nodeWidth}
          height={nodeHeight}
        />
        
        {/* Nodo Nieto 1 */}
        <NodeForAnalysisResultComponent
          x={nieto1X}
          y={nieto1Y}
          title="Nieto 1"
          width={nodeWidth}
          height={nodeHeight}
        />
        
        {/* Nodo Nieto 2 */}
        <NodeForAnalysisResultComponent
          x={nieto2X}
          y={nieto2Y}
          title="Nieto 2"
          width={nodeWidth}
          height={nodeHeight}
        />
        
        {/* Nodo Central */}
        <NodeForAnalysisResultComponent
          x={centralX}
          y={centralY}
          title="Central"
          width={nodeWidth}
          height={nodeHeight}
        />
      </svg>
    </div>
  );
}

export default AnalysisResultsComponent;

