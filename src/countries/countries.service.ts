import { Inject, Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

import { CountriesDto, CountryDto } from './dto/create-country.dto';
import { RestCountries } from './plugins';

@Injectable()
export class CountriesService extends RestCountries {
  constructor(@Inject(CACHE_MANAGER) protected cacheManager: Cache) {
    super();
  }

  async #countriesData() {
    const cachedCountries: any = await this.cacheManager.get('countries');

    if (!!cachedCountries) {
      return { data: cachedCountries, error: null };
    } else {
      const { data, errorMessage } = await this.initialize();

      await this.cacheManager.set('countries', data);
      return { data, error: errorMessage };
    }
  }

  async findAllCountries(input: CountriesDto) {
    const { data, error } = await this.#countriesData();
    const list = this.countries({ ...input, countries: data });
    return { data: list, error };
  }

  async findOneCountry({ country_name }: CountryDto) {
    const { data, error } = await this.#countriesData();
    const countryDetails = this.country({ country_name, countries: data });
    return { data: countryDetails, error };
  }

  async findRegions() {
    const { data, error } = await this.#countriesData();
    const countriesByRegion = this.regions(data);
    return { data: countriesByRegion, error };
  }

  async findLanguages() {
    const { data, error } = await this.#countriesData();
    const countriesByLanguage = this.languages(data);
    return { data: countriesByLanguage, error };
  }

  async showCountriesStatistics() {
    const { data, error } = await this.#countriesData();
    const statistics = this.statistics(data);
    return { data: statistics, error };
  }
}
