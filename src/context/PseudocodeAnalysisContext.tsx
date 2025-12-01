import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { PseudocodeAnalysisModel } from '../models/PseudocodeAnalysisModel';
import { PseudocodeAnalysisService } from '../services/PseudocodeAnalysisService';
import { LocalStorageService } from '../services/LocalStorageService';

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

const SELECTED_ITEM_ID_KEY = 'selectedItemId';

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
    // Guardar el id del item seleccionado en localStorage
    if (item) {
      LocalStorageService.set<number>(SELECTED_ITEM_ID_KEY, item.id);
    } else {
      LocalStorageService.remove(SELECTED_ITEM_ID_KEY);
    }
  };

  const getItemById = (id: number): PseudocodeAnalysisModel | null => {
    return PseudocodeAnalysisService.getById(id);
  };

  // Cargar items al montar el componente y restaurar el item seleccionado
  useEffect(() => {
    loadItems();
    
    // Restaurar el item seleccionado desde localStorage
    const savedItemId = LocalStorageService.get<number>(SELECTED_ITEM_ID_KEY);
    if (savedItemId !== null) {
      const item = PseudocodeAnalysisService.getById(savedItemId);
      if (item) {
        setSelectedItem(item);
      } else {
        // Si el item no existe, limpiar el localStorage
        LocalStorageService.remove(SELECTED_ITEM_ID_KEY);
      }
    }
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

