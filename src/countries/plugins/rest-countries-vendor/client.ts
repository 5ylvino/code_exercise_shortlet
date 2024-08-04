import { HttpClientProps, HttpClientResponse } from './definitions';

/**
 * @Client
 * Handle client HTTP setups and  connections
 */
export class Client {
  #baseUrl() {
    if (process.env.NODE_ENV === 'development') {
      return process.env.BASE_URL_DEV;
    }
    return process.env.BASE_URL_LIVE;
  }

  /**
   * @httpClient
   * JavaScript CLient for Http requests
   * @param args HttpClientProps
   * @returns
   */
  protected async httpClient({
    method = 'GET',
    params,
    data,
  }: HttpClientProps): Promise<HttpClientResponse> {
    try {
      const baseUrl = this.#baseUrl();

      const myHeaders = new Headers();
      // myHeaders.append('Authorization', `Bearer ${bearerToken}`);// for setup sake, our API don't need it
      myHeaders.append('accept', 'application/json');
      myHeaders.append('Content-Type', 'Application/json');

      const raw = data ? JSON.stringify(data) : data;
      const requestOptions: RequestInit = {
        method,
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch(`${baseUrl}${params}`, requestOptions);
      const responseData = await response.json();

      return { data: responseData, errorMessage: null };
    } catch (error) {
      return { data: null, errorMessage: error?.message };
    }
  }
}
