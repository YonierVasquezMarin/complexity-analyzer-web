import { HttpService } from './HttpService';
import type { AnalyzeBySystemRequestModel } from '../models/AnalyzeBySystemRequestModel';
import type { AnalyzeBySystemResponseModel, AnalyzeBySystemErrorResponseModel } from '../models/AnalyzeBySystemResponseModel';

/**
 * Servicio para analizar código mediante el endpoint /analyze-by-system
 */
export class AnalyzeBySystemService {
  private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  private static readonly ENDPOINT = '/analyze-by-system';

  /**
   * Analiza el pseudocódigo convertido
   * @param request - Modelo con el pseudocódigo convertido a analizar
   * @returns Promise con el resultado del análisis
   * @throws Error si la respuesta contiene un error
   */
  static async analyzeBySystem(request: AnalyzeBySystemRequestModel): Promise<AnalyzeBySystemResponseModel> {
    const httpServiceInstance = new HttpService(AnalyzeBySystemService.BASE_URL);
    
    try {
      const response = await httpServiceInstance.post<AnalyzeBySystemResponseModel | AnalyzeBySystemErrorResponseModel>(
        AnalyzeBySystemService.ENDPOINT,
        request
      );

      // Verificar si la respuesta es un error
      if ('error' in response.data) {
        const errorResponse = response.data as AnalyzeBySystemErrorResponseModel;
        throw new Error(`${errorResponse.error}: ${errorResponse.details}`);
      }

      return response.data as AnalyzeBySystemResponseModel;
    } catch (error) {
      // Si el error ya es un Error con mensaje, relanzarlo
      if (error instanceof Error) {
        // Si el mensaje contiene información del error del backend, usarlo
        if (error.message.includes('HTTP Error')) {
          // Intentar obtener más información del error HTTP
          throw new Error('Error al comunicarse con el servidor de análisis');
        }
        throw error;
      }
      throw new Error('Error desconocido al analizar el código');
    }
  }
}

