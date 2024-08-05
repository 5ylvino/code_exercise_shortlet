import { sampleForDefinition } from './constant';

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
  countries?: Array<typeof sampleForDefinition>;
}

export interface CountryProps {
  countries: Array<typeof sampleForDefinition>;
  country_name: string;
}
