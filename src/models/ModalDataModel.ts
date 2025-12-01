// Interfaz que deben implementar los componentes que se renderizan dentro del modal
export interface ModalDataProvider<T = any> {
  getData: () => T;
}

// Modelo para el nombre del nuevo archivo
export interface NameForNewFileModel {
  fileName: string;
}

