import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { CountryDto } from './dto/create-country.dto';

describe('CountriesController', () => {
  let controller: CountriesController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: CountriesService;

  const mockCountriesService = {
    findAllCountries: jest.fn(),
    findOneCountry: jest.fn(),
    findRegions: jest.fn(),
    findLanguages: jest.fn(),
    showCountriesStatistics: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        {
          provide: CountriesService,
          useValue: mockCountriesService,
        },
      ],
    }).compile();

    controller = module.get<CountriesController>(CountriesController);
    service = module.get<CountriesService>(CountriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllCountries', () => {
    it('should call findAllCountries method of CountriesService', async () => {
      const input: any = { region: 'Europe', language: 'English' };
      const result = [{ name: 'Country1' }, { name: 'Country2' }];
      mockCountriesService.findAllCountries.mockResolvedValue(result);

      expect(await controller.findAllCountries(input)).toBe(result);
      expect(mockCountriesService.findAllCountries).toHaveBeenCalledWith(input);
    });
  });

  describe('findOneCountry', () => {
    it('should call findOneCountry method of CountriesService', async () => {
      const input: CountryDto = { country_name: 'Country1' };
      const result = { name: 'Country1', population: 1000000 };
      mockCountriesService.findOneCountry.mockResolvedValue(result);

      expect(await controller.findOneCountry(input)).toBe(result);
      expect(mockCountriesService.findOneCountry).toHaveBeenCalledWith(input);
    });
  });

  describe('findRegions', () => {
    it('should call findRegions method of CountriesService', async () => {
      const result = { Region1: [{ name: 'Country1' }] };
      mockCountriesService.findRegions.mockResolvedValue(result);

      expect(await controller.findRegions()).toBe(result);
      expect(mockCountriesService.findRegions).toHaveBeenCalled();
    });
  });

  describe('findLanguages', () => {
    it('should call findLanguages method of CountriesService', async () => {
      const result = { Language1: [{ name: 'Country1' }] };
      mockCountriesService.findLanguages.mockResolvedValue(result);

      expect(await controller.findLanguages()).toBe(result);
      expect(mockCountriesService.findLanguages).toHaveBeenCalled();
    });
  });

  describe('showCountriesStatistics', () => {
    it('should call showCountriesStatistics method of CountriesService', async () => {
      const result = { totalCountries: 1, totalPopulation: 1000000 };
      mockCountriesService.showCountriesStatistics.mockResolvedValue(result);

      expect(await controller.showCountriesStatistics()).toBe(result);
      expect(mockCountriesService.showCountriesStatistics).toHaveBeenCalled();
    });
  });
});
