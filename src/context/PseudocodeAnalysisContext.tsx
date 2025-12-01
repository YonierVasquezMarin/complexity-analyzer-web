import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { PseudocodeAnalysisModel } from '../models/PseudocodeAnalysisModel';
import { PseudocodeAnalysisService } from '../services/PseudocodeAnalysisService';

interface PseudocodeAnalysisContextType {
  items: PseudocodeAnalysisModel[];
  selectedItem: PseudocodeAnalysisModel | null;
  loadItems: () => void;
  addItem: (item: PseudocodeAnalysisModel) => void;
  updateItem: (item: PseudocodeAnalysisModel) => void;
  selectItem: (item: PseudocodeAnalysisModel | null) => void;
  getItemById: (id: number) => PseudocodeAnalysisModel | null;
}

const PseudocodeAnalysisContext = createContext<PseudocodeAnalysisContextType | undefined>(undefined);

interface PseudocodeAnalysisProviderProps {
  children: ReactNode;
}

export function PseudocodeAnalysisProvider({ children }: PseudocodeAnalysisProviderProps) {
  const [items, setItems] = useState<PseudocodeAnalysisModel[]>([]);
  const [selectedItem, setSelectedItem] = useState<PseudocodeAnalysisModel | null>(null);

  const loadItems = () => {
    const loadedItems = PseudocodeAnalysisService.getAll();
    setItems(loadedItems);
  };

  const addItem = (item: PseudocodeAnalysisModel) => {
    PseudocodeAnalysisService.save(item);
    loadItems();
  };

  const updateItem = (item: PseudocodeAnalysisModel) => {
    PseudocodeAnalysisService.update(item);
    loadItems();
    // Si el item actualizado es el seleccionado, actualizar también el estado
    if (selectedItem && selectedItem.id === item.id) {
      setSelectedItem(item);
    }
  };

  const selectItem = (item: PseudocodeAnalysisModel | null) => {
    setSelectedItem(item);
  };

  const getItemById = (id: number): PseudocodeAnalysisModel | null => {
    return PseudocodeAnalysisService.getById(id);
  };

  // Cargar items al montar el componente
  useEffect(() => {
    loadItems();
  }, []);

  return (
    <PseudocodeAnalysisContext.Provider
      value={{
        items,
        selectedItem,
        loadItems,
        addItem,
        updateItem,
        selectItem,
        getItemById,
      }}
    >
      {children}
    </PseudocodeAnalysisContext.Provider>
  );
}

export function usePseudocodeAnalysis() {
  const context = useContext(PseudocodeAnalysisContext);
  if (context === undefined) {
    throw new Error('usePseudocodeAnalysis debe ser usado dentro de un PseudocodeAnalysisProvider');
  }
  return context;
}

