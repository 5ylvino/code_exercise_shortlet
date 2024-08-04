import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { CountriesDto, CountryDto } from './dto/create-country.dto';

@ApiTags('countries')
@ApiBearerAuth()
@Controller({ version: process.env.ROUTE_VERSION, path: '' })
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('countries')
  @ApiOperation({ summary: 'Retrieve all countries' })
  @ApiQuery({
    name: 'input',
    description: 'Query parameters for filtering countries',
    type: CountriesDto,
  })
  @ApiResponse({
    status: 200,
    description: 'List of countries',
    schema: {
      example: [
        { id: 1, name: 'Nigeria', code: 'NG' },
        { id: 2, name: 'Kenya', code: 'KE' },
      ],
    },
  })
  findAllCountries(@Query() input: CountriesDto) {
    return this.countriesService.findAllCountries(input);
  }

  @Get('countries/:country_name')
  @ApiOperation({ summary: 'Retrieve a single country by name' })
  @ApiParam({
    name: 'country_name',
    description: 'Name of the country to retrieve',
    example: 'Nigeria',
  })
  @ApiResponse({
    status: 200,
    description: 'Details of the country',
    schema: {
      example: { id: 1, name: 'Nigeria', code: 'NG' },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Country not found',
  })
  findOneCountry(@Param() input: CountryDto) {
    return this.countriesService.findOneCountry(input);
  }

  @Get('/regions')
  @ApiOperation({ summary: 'Retrieve all regions' })
  @ApiResponse({
    status: 200,
    description: 'List of regions',
    schema: {
      example: [
        { id: 1, name: 'West Africa' },
        { id: 2, name: 'East Africa' },
      ],
    },
  })
  findRegions() {
    return this.countriesService.findRegions();
  }

  @Get('/languages')
  @ApiOperation({ summary: 'Retrieve all languages' })
  @ApiResponse({
    status: 200,
    description: 'List of languages',
    schema: {
      example: [
        { id: 1, name: 'English' },
        { id: 2, name: 'Swahili' },
      ],
    },
  })
  findLanguages() {
    return this.countriesService.findLanguages();
  }

  @Get('/statistics')
  @ApiOperation({ summary: 'Retrieve statistics about countries' })
  @ApiResponse({
    status: 200,
    description: 'Statistics about countries',
    schema: {
      example: {
        totalCountries: 195,
        countriesByRegion: { Africa: 54, Asia: 49 },
      },
    },
  })
  showCountriesStatistics() {
    return this.countriesService.showCountriesStatistics();
  }
}
