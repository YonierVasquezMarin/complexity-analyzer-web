import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { PseudocodeAnalysisModel } from '../models/PseudocodeAnalysisModel';
import { PseudocodeAnalysisService } from '../services/PseudocodeAnalysisService';
import { LocalStorageService } from '../services/LocalStorageService';

interface PseudocodeAnalysisContextType {
  items: PseudocodeAnalysisModel[];
  selectedItem: PseudocodeAnalysisModel | null;
  editedCode: string;
  executeAnalysisInThisMoment: boolean;
  loadItems: () => void;
  addItem: (item: PseudocodeAnalysisModel) => void;
  updateItem: (item: PseudocodeAnalysisModel) => void;
  selectItem: (item: PseudocodeAnalysisModel | null) => void;
  getItemById: (id: number) => PseudocodeAnalysisModel | null;
  setEditedCode: (code: string) => void;
  saveEditedCode: () => void;
  setExecuteAnalysisInThisMoment: (value: boolean) => void;
}

const PseudocodeAnalysisContext = createContext<PseudocodeAnalysisContextType | undefined>(undefined);

const SELECTED_ITEM_ID_KEY = 'selectedItemId';

interface PseudocodeAnalysisProviderProps {
  children: ReactNode;
}

export function PseudocodeAnalysisProvider({ children }: PseudocodeAnalysisProviderProps) {
  const [items, setItems] = useState<PseudocodeAnalysisModel[]>([]);
  const [selectedItem, setSelectedItem] = useState<PseudocodeAnalysisModel | null>(null);
  const [editedCode, setEditedCode] = useState<string>('');
  const [executeAnalysisInThisMoment, setExecuteAnalysisInThisMoment] = useState<boolean>(false);

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
    // Inicializar el código editado con el pseudocódigo del item seleccionado
    if (item) {
      setEditedCode(item.pseudocode);
      LocalStorageService.set<number>(SELECTED_ITEM_ID_KEY, item.id);
    } else {
      setEditedCode('');
      LocalStorageService.remove(SELECTED_ITEM_ID_KEY);
    }
  };

  const handleSetEditedCode = (code: string) => {
    setEditedCode(code);
  };

  const saveEditedCode = () => {
    if (selectedItem) {
      const updatedItem = {
        ...selectedItem,
        pseudocode: editedCode,
      };
      updateItem(updatedItem);
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
        setEditedCode(item.pseudocode);
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
        editedCode,
        executeAnalysisInThisMoment,
        loadItems,
        addItem,
        updateItem,
        selectItem,
        getItemById,
        setEditedCode: handleSetEditedCode,
        saveEditedCode,
        setExecuteAnalysisInThisMoment,
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

