export interface HttpClientProps {
  method: 'GET' | 'POST';
  params?: string;
  data?: any;
}
export interface HttpClientResponse {
  data: any;
  errorMessage: any;
}

export interface CountriesListProps {
  region?: string;
  population?: number;
  page: number;
  limit?: number;
  countries?: Array<any>;
}

export interface CountryProps {
  countries: Array<any>;
  country_name: string;
}
