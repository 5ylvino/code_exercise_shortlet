import { PartialType } from '@nestjs/mapped-types';
import { CountriesDto } from './create-country.dto';

export class UpdateCountryDto extends PartialType(CountriesDto) {}
