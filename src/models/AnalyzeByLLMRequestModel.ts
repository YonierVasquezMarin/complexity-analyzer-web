/**
 * Modelo de request para el servicio de análisis por LLM
 * 
 * Propiedades:
 * - pseudocode: El pseudocódigo convertido que se desea analizar
 *   Ejemplo: "for i 🡨 1 to n do begin x 🡨 x + 1 end for j 🡨 1 to n do begin x 🡨 x + 1 end"
 */
export interface AnalyzeByLLMRequestModel {
  pseudocode: string;
}

