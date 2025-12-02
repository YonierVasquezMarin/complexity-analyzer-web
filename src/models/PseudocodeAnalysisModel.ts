import type { AnalyzeBySystemResponseModel } from './AnalyzeBySystemResponseModel';
import type { AnalyzeByLLMResponseModel } from './AnalyzeByLLMResponseModel';

/**
 * La interfaz PseudocodeAnalysisModel representa el modelo de un análisis de pseudocódigo.
 *
 * Propiedades:
 * - id: Identificador único del análisis (puede ser un número incremental).
 *   Ejemplo: 123
 *
 * - pseudocode: Texto del pseudocódigo a analizar o que fue analizado.
 *   Ejemplo: "for i 🡨 1 to n do begin x 🡨 x + 1 end"
 *
 * - convertedPseudocode: Pseudocodigo convertido totalmente a las instrucciones esperadas.
 *   Ejemplo: "for i 🡨 1 to n do begin x 🡨 x + 1 end ► Completar: poner otro bucle pero con la letra j"
 *   es convertido a "for i 🡨 1 to n do begin x 🡨 x + 1 end for j 🡨 1 to n do begin x 🡨 x + 1 end"
 * 
 * - fileName: Nombre del archivo asociado al pseudocódigo, si proviene de un archivo subido
 *   por el usuario (puede ser útil para referencia o para mostrar al usuario).
 *   Ejemplo: "algoritmo1.txt"
 * 
 * - systemAnalysis: Resultado del análisis por sistema del pseudocódigo convertido.
 *   Contiene las notaciones Big O, Omega, Theta y los detalles de complejidad.
 * 
 * - llmAnalysis: Resultado del análisis por LLM del pseudocódigo convertido.
 *   Contiene un análisis completo de complejidad generado por LLM con análisis paso a paso,
 *   clasificación de patrones, representación matemática, diagramas y análisis de costos.
 */
export interface PseudocodeAnalysisModel {
  id: number;
  pseudocode: string;
  convertedPseudocode?: string;
  fileName: string;
  systemAnalysis?: AnalyzeBySystemResponseModel;
  llmAnalysis?: AnalyzeByLLMResponseModel;
}

