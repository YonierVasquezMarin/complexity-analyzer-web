import { type ReactNode } from 'react';

interface EmptyStateComponentProps {
  icon: ReactNode;
  label: string;
  className?: string;
}

function EmptyStateComponent({ icon, label, className = '' }: EmptyStateComponentProps) {
  return (
    <div className={`flex flex-col items-center justify-center h-full w-full select-none ${className}`}>
      <div className="opacity-40 text-gray-400 mb-4">
        {icon}
      </div>
      <p className="text-gray-400 text-lg font-medium">
        {label}
      </p>
    </div>
  );
}

export default EmptyStateComponent;

