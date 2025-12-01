import { Handle, Position } from 'reactflow';

interface NodeForAnalysisResultComponentProps {
  data: {
    title: string;
  };
  selected?: boolean;
}

function NodeForAnalysisResultComponent({
  data,
  selected = false,
}: NodeForAnalysisResultComponentProps) {
  const width = 120;
  const height = 60;

  const handleClick = () => {
    alert(`Nodo: ${data.title}`);
  };

  return (
    <div
      className={`bg-gray-200 border-2 rounded px-4 py-2 min-w-[${width}px] min-h-[${height}px] flex items-center justify-center ${
        selected ? 'border-blue-500' : 'border-gray-700'
      }`}
      style={{ width: `${width}px`, minHeight: `${height}px`, cursor: 'pointer' }}
      onClick={handleClick}
    >
      <Handle type="target" position={Position.Top} id="top" isConnectable={false} />
      <Handle type="source" position={Position.Left} id="left" isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left-target" isConnectable={false} />
      <Handle type="target" position={Position.Right} id="right-target" isConnectable={false} />
      <div className="text-sm font-semibold text-gray-800 text-center">
        {data.title}
      </div>
      <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={false} />
    </div>
  );
}

export default NodeForAnalysisResultComponent;

