/**
 * Servicio genérico para leer y escribir en localStorage
 * Utiliza tipos genéricos <T> para adaptarse a cualquier modelo
 */
export class LocalStorageService {
  /**
   * Lee un valor del localStorage
   * @param key - Clave del localStorage
   * @returns El valor parseado o null si no existe
   */
  static get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error al leer del localStorage con clave "${key}":`, error);
      return null;
    }
  }

  /**
   * Escribe un valor en el localStorage
   * @param key - Clave del localStorage
   * @param value - Valor a guardar (será serializado a JSON)
   */
  static set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error al escribir en localStorage con clave "${key}":`, error);
    }
  }

  /**
   * Elimina un valor del localStorage
   * @param key - Clave del localStorage a eliminar
   */
  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error al eliminar del localStorage con clave "${key}":`, error);
    }
  }

  /**
   * Limpia todo el localStorage
   */
  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error al limpiar el localStorage:', error);
    }
  }
}

