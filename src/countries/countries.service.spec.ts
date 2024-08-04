import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CountriesService } from './countries.service';
import { CountriesDto, CountryDto } from './dto/create-country.dto';
import { RestCountries } from './plugins';

describe('CountriesService', () => {
  let service: CountriesService;
  let cacheManager: Cache;
  let restCountries: RestCountries;

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const mockRestCountries = {
    initialize: jest.fn(),
    countries: jest.fn(),
    country: jest.fn(),
    regions: jest.fn(),
    languages: jest.fn(),
    statistics: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountriesService,
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
        { provide: RestCountries, useValue: mockRestCountries },
      ],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
    restCountries = module.get<RestCountries>(RestCountries);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllCountries', () => {
    it('should return the list of all countries', async () => {
      const input: any = { region: 'Europe', language: 'English' };
      const countriesData = [{ name: 'Country1' }, { name: 'Country2' }];

      mockCacheManager.get.mockResolvedValueOnce(countriesData);
      mockRestCountries.countries.mockReturnValueOnce(countriesData);

      const result = await service.findAllCountries(input);

      expect(result.data).toEqual(countriesData);
      expect(result.error).toBeNull();
      expect(mockCacheManager.get).toHaveBeenCalledWith('countries');
      expect(mockRestCountries.countries).toHaveBeenCalledWith({
        ...input,
        countries: countriesData,
      });
    });

    it('should return an error if countries data retrieval fails', async () => {
      const input: any = { region: 'Europe', language: 'English' };

      mockCacheManager.get.mockResolvedValueOnce(null);
      mockRestCountries.initialize.mockResolvedValueOnce({
        data: null,
        errorMessage: 'Failed to fetch countries',
      });

      const result = await service.findAllCountries(input);

      expect(result.data).toBeNull();
      expect(result.error).toBe('Failed to fetch countries');
      expect(mockCacheManager.get).toHaveBeenCalledWith('countries');
    });
  });

  // describe('findOneCountry', () => {
  //   it('should return the details of a specific country', async () => {
  //     const input: CountryDto = { country_name: 'Country1' };
  //     const countriesData = [{ name: 'Country1' }];
  //     const countryDetails = { name: 'Country1', population: 1000000 };

  //     mockCacheManager.get.mockResolvedValueOnce(countriesData);
  //     mockRestCountries.country.mockReturnValueOnce(countryDetails);

  //     const result = await service.findOneCountry(input);

  //     expect(result.data).toEqual(countryDetails);
  //     expect(result.error).toBeNull();
  //     expect(mockCacheManager.get).toHaveBeenCalledWith('countries');
  //     expect(mockRestCountries.country).toHaveBeenCalledWith({
  //       country_name: input.country_name,
  //       countries: countriesData,
  //     });
  //   });
  // });

  // describe('findRegions', () => {
  //   it('should return countries grouped by region', async () => {
  //     const countriesData = [{ name: 'Country1', region: 'Region1' }];
  //     const countriesByRegion = { Region1: [{ name: 'Country1' }] };

  //     mockCacheManager.get.mockResolvedValueOnce(countriesData);
  //     mockRestCountries.regions.mockReturnValueOnce(countriesByRegion);

  //     const result = await service.findRegions();

  //     expect(result.data).toEqual(countriesByRegion);
  //     expect(result.error).toBeNull();
  //     expect(mockCacheManager.get).toHaveBeenCalledWith('countries');
  //     expect(mockRestCountries.regions).toHaveBeenCalledWith(countriesData);
  //   });
  // });

  // describe('findLanguages', () => {
  //   it('should return countries grouped by language', async () => {
  //     const countriesData = [{ name: 'Country1', languages: ['Language1'] }];
  //     const countriesByLanguage = { Language1: [{ name: 'Country1' }] };

  //     mockCacheManager.get.mockResolvedValueOnce(countriesData);
  //     mockRestCountries.languages.mockReturnValueOnce(countriesByLanguage);

  //     const result = await service.findLanguages();

  //     expect(result.data).toEqual(countriesByLanguage);
  //     expect(result.error).toBeNull();
  //     expect(mockCacheManager.get).toHaveBeenCalledWith('countries');
  //     expect(mockRestCountries.languages).toHaveBeenCalledWith(countriesData);
  //   });
  // });

  // describe('showCountriesStatistics', () => {
  //   it('should return countries statistics', async () => {
  //     const countriesData = [{ name: 'Country1', population: 1000000 }];
  //     const statistics = { totalCountries: 1, totalPopulation: 1000000 };

  //     mockCacheManager.get.mockResolvedValueOnce(countriesData);
  //     mockRestCountries.statistics.mockReturnValueOnce(statistics);

  //     const result = await service.showCountriesStatistics();

  //     expect(result.data).toEqual(statistics);
  //     expect(result.error).toBeNull();
  //     expect(mockCacheManager.get).toHaveBeenCalledWith('countries');
  //     expect(mockRestCountries.statistics).toHaveBeenCalledWith(countriesData);
  //   });
  // });
});
