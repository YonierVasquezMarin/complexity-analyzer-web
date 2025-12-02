/**
 * Modelo de response para el servicio de análisis por sistema
 * 
 * Representa la respuesta exitosa del endpoint POST /analyze-by-system
 */

/**
 * Detalles de complejidad en la respuesta de análisis
 */
export interface ComplexityDetails {
  loops: string[];
  recursion: string | null;
  combination: string;
  early_exit_detected: boolean;
}

/**
 * Modelo de respuesta exitosa para el endpoint POST /analyze-by-system
 */
export interface AnalyzeBySystemResponseModel {
  O: string;
  Omega: string;
  Theta: string;
  details: ComplexityDetails;
}

/**
 * Modelo de respuesta con error para el endpoint POST /analyze-by-system
 */
export interface AnalyzeBySystemErrorResponseModel {
  error: string;
  details: string;
}

