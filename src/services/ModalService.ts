import type { ReactNode } from 'react';
import type { ModalDataProvider } from '../models/ModalDataModel';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalOptions<T = any> {
  title?: string;
  size?: ModalSize;
  content: ReactNode | string;
  actionForYes?: (data: T) => void;
  actionForNo?: () => void;
  labelYes?: string;
  labelNo?: string;
}

class ModalServiceClass {
  private modalState: {
    isOpen: boolean;
    options: ModalOptions<any> | null;
  } = {
    isOpen: false,
    options: null,
  };

  private listeners: Set<() => void> = new Set();

  // Método genérico para mostrar el modal con tipado
  showModal<T>(options: ModalOptions<T>): void {
    console.log('ModalService.showModal llamado con options:', options);
    this.modalState = {
      isOpen: true,
      options: options as ModalOptions<any>,
    };
    console.log('ModalService: Estado actualizado, listeners:', this.listeners.size);
    this.notifyListeners();
  }

  // Método específico para obtener el estado del modal
  getState() {
    return this.modalState;
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.modalState = {
      isOpen: false,
      options: null,
    };
    this.notifyListeners();
  }

  // Método para ejecutar la acción de "Yes" (Ok)
  executeYesAction(contentRef: React.RefObject<ModalDataProvider>): void {
    if (!this.modalState.options) return;

    const data = contentRef.current?.getData();
    if (this.modalState.options.actionForYes) {
      this.modalState.options.actionForYes(data);
    }
    this.closeModal();
  }

  // Método para ejecutar la acción de "No" (Cancelar)
  executeNoAction(): void {
    if (this.modalState.options?.actionForNo) {
      this.modalState.options.actionForNo();
    }
    this.closeModal();
  }

  // Suscribirse a cambios en el estado del modal
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    console.log('ModalService.notifyListeners: Notificando a', this.listeners.size, 'listeners');
    this.listeners.forEach((listener) => {
      console.log('ModalService: Ejecutando listener');
      listener();
    });
  }
}

export const ModalService = new ModalServiceClass();

