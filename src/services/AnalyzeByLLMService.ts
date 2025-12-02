import { HttpService } from './HttpService';
import type { AnalyzeByLLMRequestModel } from '../models/AnalyzeByLLMRequestModel';
import type { AnalyzeByLLMResponseModel, AnalyzeByLLMErrorResponseModel } from '../models/AnalyzeByLLMResponseModel';

/**
 * Servicio para analizar código mediante el endpoint /analyze-by-llm
 */
export class AnalyzeByLLMService {
  private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  private static readonly ENDPOINT = '/analyze-by-llm';

  /**
   * Analiza el pseudocódigo convertido usando LLM
   * @param request - Modelo con el pseudocódigo convertido a analizar
   * @returns Promise con el resultado del análisis
   * @throws Error si la respuesta contiene un error
   */
  static async analyzeByLLM(request: AnalyzeByLLMRequestModel): Promise<AnalyzeByLLMResponseModel> {
    const httpServiceInstance = new HttpService(AnalyzeByLLMService.BASE_URL);
    
    try {
      const response = await httpServiceInstance.post<AnalyzeByLLMResponseModel | AnalyzeByLLMErrorResponseModel>(
        AnalyzeByLLMService.ENDPOINT,
        request
      );

      // Verificar si la respuesta es un error
      if ('error' in response.data) {
        const errorResponse = response.data as AnalyzeByLLMErrorResponseModel;
        throw new Error(`${errorResponse.error}: ${errorResponse.details}`);
      }

      return response.data as AnalyzeByLLMResponseModel;
    } catch (error) {
      // Si el error ya es un Error con mensaje, relanzarlo
      if (error instanceof Error) {
        // Si el mensaje contiene información del error del backend, usarlo
        if (error.message.includes('HTTP Error')) {
          // Intentar obtener más información del error HTTP
          throw new Error('Error al comunicarse con el servidor de análisis LLM');
        }
        throw error;
      }
      throw new Error('Error desconocido al analizar el código con LLM');
    }
  }
}

