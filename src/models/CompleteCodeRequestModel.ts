/**
 * Modelo de request para el servicio de completar código
 * 
 * Propiedades:
 * - pseudocode: El pseudocódigo que se desea completar
 *   Ejemplo: "for i 🡨 1 to n do begin x 🡨 x + 1 end"
 */
export interface CompleteCodeRequestModel {
  pseudocode: string;
}

