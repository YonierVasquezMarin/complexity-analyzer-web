/**
 * Servicio genérico para realizar consultas HTTP
 * Utiliza tipos genéricos <T> para adaptarse a cualquier modelo de respuesta
 */

export interface HttpRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number | boolean>;
  signal?: AbortSignal;
}

export interface HttpResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export class HttpService {
  private baseURL: string;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
  }

  /**
   * Construye la URL con parámetros de consulta
   * @param url - URL base
   * @param params - Parámetros de consulta
   * @returns URL con parámetros
   */
  private buildURL(url: string, params?: Record<string, string | number | boolean>): string {
    const fullURL = this.baseURL ? `${this.baseURL}${url}` : url;
    
    if (!params || Object.keys(params).length === 0) {
      return fullURL;
    }

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });

    const separator = fullURL.includes('?') ? '&' : '?';
    return `${fullURL}${separator}${searchParams.toString()}`;
  }

  /**
   * Realiza una petición HTTP genérica
   * @param url - URL del endpoint
   * @param options - Opciones de la petición (método, headers, body, params)
   * @returns Promise con la respuesta tipada
   */
  async request<T>(url: string, options: HttpRequestOptions = {}): Promise<HttpResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      params,
      signal,
    } = options;

    const requestURL = this.buildURL(url, params);

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    const requestOptions: RequestInit = {
      method,
      headers: defaultHeaders,
      signal,
    };

    if (body && method !== 'GET' && method !== 'DELETE') {
      requestOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(requestURL, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      // Intentar parsear como JSON, si falla retornar texto
      let data: T;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json() as T;
      } else {
        data = (await response.text()) as unknown as T;
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error en petición HTTP ${method} ${url}:`, error.message);
        throw error;
      }
      throw new Error('Error desconocido en la petición HTTP');
    }
  }

  /**
   * Realiza una petición GET
   * @param url - URL del endpoint
   * @param params - Parámetros de consulta
   * @param headers - Headers adicionales
   * @returns Promise con la respuesta tipada
   */
  async get<T>(
    url: string,
    params?: Record<string, string | number | boolean>,
    headers?: Record<string, string>
  ): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      method: 'GET',
      params,
      headers,
    });
  }

  /**
   * Realiza una petición POST
   * @param url - URL del endpoint
   * @param body - Cuerpo de la petición
   * @param headers - Headers adicionales
   * @returns Promise con la respuesta tipada
   */
  async post<T>(
    url: string,
    body?: unknown,
    headers?: Record<string, string>
  ): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      method: 'POST',
      body,
      headers,
    });
  }

  /**
   * Realiza una petición PUT
   * @param url - URL del endpoint
   * @param body - Cuerpo de la petición
   * @param headers - Headers adicionales
   * @returns Promise con la respuesta tipada
   */
  async put<T>(
    url: string,
    body?: unknown,
    headers?: Record<string, string>
  ): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      method: 'PUT',
      body,
      headers,
    });
  }

  /**
   * Realiza una petición PATCH
   * @param url - URL del endpoint
   * @param body - Cuerpo de la petición
   * @param headers - Headers adicionales
   * @returns Promise con la respuesta tipada
   */
  async patch<T>(
    url: string,
    body?: unknown,
    headers?: Record<string, string>
  ): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      method: 'PATCH',
      body,
      headers,
    });
  }

  /**
   * Realiza una petición DELETE
   * @param url - URL del endpoint
   * @param headers - Headers adicionales
   * @returns Promise con la respuesta tipada
   */
  async delete<T>(
    url: string,
    headers?: Record<string, string>
  ): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      method: 'DELETE',
      headers,
    });
  }

  /**
   * Establece la URL base para todas las peticiones
   * @param baseURL - URL base
   */
  setBaseURL(baseURL: string): void {
    this.baseURL = baseURL;
  }
}

// Instancia por defecto del servicio
export const httpService = new HttpService();

