import type { PseudocodeAnalysisModel } from '../models/PseudocodeAnalysisModel';
import { LocalStorageService } from './LocalStorageService';

const STORAGE_KEY = 'pseudocode_analysis_list';

/**
 * Servicio para gestionar la lista de PseudocodeAnalysisModel en localStorage
 */
export class PseudocodeAnalysisService {
  /**
   * Obtiene todos los análisis de pseudocódigo guardados
   * @returns Lista de PseudocodeAnalysisModel
   */
  static getAll(): PseudocodeAnalysisModel[] {
    const list = LocalStorageService.get<PseudocodeAnalysisModel[]>(STORAGE_KEY);
    return list || [];
  }

  /**
   * Guarda un nuevo análisis de pseudocódigo en la lista
   * @param model - Modelo a guardar
   */
  static save(model: PseudocodeAnalysisModel): void {
    const list = this.getAll();
    list.push(model);
    LocalStorageService.set(STORAGE_KEY, list);
  }

  /**
   * Obtiene el siguiente ID consecutivo disponible
   * @returns El siguiente ID disponible
   */
  static getNextId(): number {
    const list = this.getAll();
    if (list.length === 0) {
      return 1;
    }
    const maxId = Math.max(...list.map(item => item.id));
    return maxId + 1;
  }

  /**
   * Obtiene un análisis por su ID
   * @param id - ID del análisis
   * @returns El modelo encontrado o null
   */
  static getById(id: number): PseudocodeAnalysisModel | null {
    const list = this.getAll();
    return list.find(item => item.id === id) || null;
  }

  /**
   * Elimina un análisis por su ID
   * @param id - ID del análisis a eliminar
   */
  static deleteById(id: number): void {
    const list = this.getAll();
    const filteredList = list.filter(item => item.id !== id);
    LocalStorageService.set(STORAGE_KEY, filteredList);
  }

  /**
   * Elimina todos los análisis
   */
  static clearAll(): void {
    LocalStorageService.remove(STORAGE_KEY);
  }
}

