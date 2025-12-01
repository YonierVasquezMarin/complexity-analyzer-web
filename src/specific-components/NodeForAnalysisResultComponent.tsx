interface NodeForAnalysisResultComponentProps {
  x: number;
  y: number;
  title: string;
  width?: number;
  height?: number;
}

function NodeForAnalysisResultComponent({
  x,
  y,
  title,
  width = 120,
  height = 60,
}: NodeForAnalysisResultComponentProps) {
  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        fill="#e5e7eb"
        stroke="#374151"
        strokeWidth="2"
        rx="4"
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-sm font-semibold fill-gray-800"
      >
        {title}
      </text>
    </g>
  );
}

export default NodeForAnalysisResultComponent;

