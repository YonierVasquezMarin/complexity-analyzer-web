import { Handle, Position } from 'reactflow';
import { FaClock, FaSync, FaCheckCircle } from 'react-icons/fa';

export type NodeStatus = 'not_started' | 'in_progress' | 'completed';

interface NodeForAnalysisResultComponentProps {
  data: {
    title: string;
    status?: NodeStatus;
  };
  selected?: boolean;
}

interface NodeContentProps {
  data: {
    title: string;
    status?: NodeStatus;
    [key: string]: any;
  };
  className?: string;
}

function NodeContent({ data, className = '' }: NodeContentProps) {
  const getStatusIcon = () => {
    switch (data.status) {
      case 'not_started':
        return <FaClock className="text-gray-400" size={16} />;
      case 'in_progress':
        return <FaSync className="text-yellow-500 animate-spin" size={16} />;
      case 'completed':
        return <FaCheckCircle className="text-green-500" size={16} />;
      default:
        return <FaClock className="text-gray-400" size={16} />;
    }
  };

  return (
    <div className={`flex flex-col items-center gap-2 text-sm font-semibold text-gray-800 ${className}`}>
      <span className="text-center">{data.title}</span>
      {getStatusIcon()}
    </div>
  );
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
      <NodeContent data={data} />
      <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={false} />
    </div>
  );
}

export default NodeForAnalysisResultComponent;

