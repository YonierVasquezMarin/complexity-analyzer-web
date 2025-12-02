/**
 * Modelo de response para el servicio de completar código
 * 
 * Propiedades:
 * - pseudocode: El pseudocódigo convertido/completado
 *   Ejemplo: "for i 🡨 1 to n do begin x 🡨 x + 1 end for j 🡨 1 to n do begin x 🡨 x + 1 end"
 */
export interface CompleteCodeResponseModel {
  pseudocode: string;
}

