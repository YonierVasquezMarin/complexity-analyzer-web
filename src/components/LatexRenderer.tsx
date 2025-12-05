import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface LatexRendererProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

function LatexRenderer({ latex, displayMode = false, className = '' }: LatexRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && latex) {
      // Limpiar el contenido anterior antes de renderizar
      containerRef.current.innerHTML = '';
      
      try {
        katex.render(latex, containerRef.current, {
          displayMode,
          throwOnError: false,
          trust: true,
        });
      } catch (error) {
        console.error('Error rendering LaTeX:', error);
        if (containerRef.current) {
          containerRef.current.textContent = latex;
        }
      }
    }
    
    // Cleanup function para limpiar al desmontar
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [latex, displayMode]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ 
        display: displayMode ? 'block' : 'inline-block',
        width: '100%',
        maxWidth: '100%',
        overflow: 'visible',
        lineHeight: displayMode ? 'normal' : 'inherit',
        // Prevenir que KaTeX afecte el layout global
        contain: 'layout style paint',
        position: 'relative',
        isolation: 'isolate',
      }}
    />
  );
}

export default LatexRenderer;

