import { IsString } from 'class-validator';

export class CountriesDto {
  region?: string;

  population?: number;

  // @IsNumber()
  page: number;
}

export class CountryDto {
  @IsString()
  country_name?: string;
}
