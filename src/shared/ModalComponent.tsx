import { useEffect, useRef, useState, cloneElement, isValidElement } from 'react';
import { ModalService } from '../services/ModalService';
import type { ModalDataProvider } from '../models/ModalDataModel';
import ButtonComponent from './ButtonComponent';

function ModalComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ReturnType<typeof ModalService.getState>['options']>(null);
  const contentRef = useRef<ModalDataProvider>(null);

  useEffect(() => {
    const updateState = () => {
      const state = ModalService.getState();
      console.log('ModalComponent: Estado actualizado', state);
      setIsOpen(state.isOpen);
      setOptions(state.options);
      // Resetear el ref cuando se cierra el modal
      if (!state.isOpen) {
        contentRef.current = null;
      }
    };

    const unsubscribe = ModalService.subscribe(updateState);

    // Cargar estado inicial
    updateState();

    return unsubscribe;
  }, []);

  const handleYes = () => {
    if (!options) return;
    
    console.log('handleYes llamado, contentRef.current =', contentRef.current);
    // Si el contenido es string, no hay ref, ejecutar directamente
    if (typeof options.content === 'string') {
      if (options.actionForYes) {
        options.actionForYes(undefined);
      }
      ModalService.closeModal();
    } else if (contentRef.current) {
      ModalService.executeYesAction(contentRef as React.RefObject<ModalDataProvider>);
    } else {
      // Si no hay ref pero hay actionForYes, ejecutarlo sin datos
      if (options.actionForYes) {
        options.actionForYes(undefined);
      }
      ModalService.closeModal();
    }
  };

  const handleNo = () => {
    ModalService.executeNoAction();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleNo();
    }
  };

  useEffect(() => {
    console.log('ModalComponent: isOpen =', isOpen, 'options =', options);
  }, [isOpen, options]);

  if (!isOpen || !options) {
    return null;
  }

  const sizeClasses: Record<string, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  const sizeClass = sizeClasses[options.size || 'md'];

  // Clonar el contenido para pasarle el ref si es un elemento React válido
  // Si es string, renderizarlo directamente
  const contentWithRef = typeof options.content === 'string'
    ? <p className="text-white">{options.content}</p>
    : isValidElement(options.content)
    ? cloneElement(options.content as React.ReactElement<any>, { 
        ref: contentRef,
        key: 'modal-content' // Agregar key para forzar re-render cuando cambia el contenido
      })
    : options.content;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-[#2a2a3e] rounded-lg shadow-xl ${sizeClass} w-full mx-4 flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {options.title && (
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">{options.title}</h2>
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-4 flex-1 overflow-y-auto">
          {contentWithRef}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-700 flex justify-end gap-3">
          {options.labelNo && (
            <ButtonComponent
              label={options.labelNo}
              onClick={handleNo}
              variant="outline"
              size="md"
            />
          )}
          {options.labelYes && (
            <ButtonComponent
              label={options.labelYes}
              onClick={handleYes}
              variant="primary"
              size="md"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalComponent;

