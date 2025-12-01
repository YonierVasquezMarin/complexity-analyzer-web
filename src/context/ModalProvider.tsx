import { type ReactNode } from 'react';
import ModalComponent from '../shared/ModalComponent';

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  return (
    <>
      {children}
      <ModalComponent />
    </>
  );
}

