import { HttpService } from './HttpService';
import type { CompleteCodeRequestModel } from '../models/CompleteCodeRequestModel';
import type { CompleteCodeResponseModel } from '../models/CompleteCodeResponseModel';

/**
 * Servicio para completar código mediante el endpoint /complete-code
 */
export class CompleteCodeService {
  private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  private static readonly ENDPOINT = '/complete-code';

  /**
   * Completa el pseudocódigo enviado
   * @param request - Modelo con el pseudocódigo a completar
   * @returns Promise con el pseudocódigo completado
   */
  static async completeCode(request: CompleteCodeRequestModel): Promise<CompleteCodeResponseModel> {
    const httpServiceInstance = new HttpService(CompleteCodeService.BASE_URL);
    
    const response = await httpServiceInstance.post<CompleteCodeResponseModel>(
      CompleteCodeService.ENDPOINT,
      request
    );

    return response.data;
  }
}

