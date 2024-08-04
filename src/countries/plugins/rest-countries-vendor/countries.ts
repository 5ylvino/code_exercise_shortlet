import { Client } from './client';
import { ENDPOINTS } from './constant';
import { CountriesListProps, CountryProps } from './definitions';

/**
 * @Countries
 * Handle all business logic relative to RestCountries countries
 */
export class Countries extends Client {
  constructor() {
    super();
  }

  /**
   * @initialize
   * This initializes the call to call to 'rest-countries' API. (EX: and cached afterwards)
   */
  async initialize() {
    return await this.httpClient({
      method: 'GET',
      params: ENDPOINTS?.all,
    });
  }

  /**
   * @countries
   * This is pulls out list of countries
   * @param args CountriesListProps
   * @returns
   */
  countries({
    region,
    population,
    page = 1,
    limit = 10,
    countries,
  }: CountriesListProps) {
    if (!countries) {
      return countries;
    }

    if (region) {
      countries = countries.filter(
        (country) => country.region?.toLowerCase() === region?.toLowerCase(),
      );
    }

    if (population) {
      countries = countries.filter(
        (country) => country.population <= population,
      );
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    countries = countries.slice(start, end);

    return countries;
  }

  /**
   * @country
   * Handles finding a country and show their details
   * @param country_name
   * @returns
   */
  country({ countries, country_name }: CountryProps) {
    return countries.find(
      (country) =>
        country.name?.common?.toLowerCase() === country_name?.toLowerCase() ||
        country.name?.official
          ?.toLowerCase()
          ?.includes(country_name?.toLowerCase()),
    );
  }

  /**
   * @regions
   * Handles retrieving of countries' regions
   * @param countryList Array
   * @returns
   */
  regions(countries: Array<any>): Array<any> {
    return Object.entries(
      countries?.reduce((accumulatedCountries, country) => {
        const region = country?.region?.toLowerCase();

        if (!accumulatedCountries[region]) {
          accumulatedCountries[region] = [];
        }

        accumulatedCountries[region]?.push(country);
        return accumulatedCountries;
      }, {}),
    )?.map(([region, countryList]: [string, Array<any>]) => ({
      region,
      countries: countryList?.map((country) => country?.name?.common),
      total_population: countryList?.reduce(
        (sum, country) => sum + country.population,
        0,
      ),
    }));
  }

  /**
   * @languages
   * Handles retrieving of countries' languages
   * @param countryList Array
   * @returns
   */
  languages(countryList: Array<any>): any {
    return countryList
      ?.flatMap((country) => Object.keys(country?.languages ?? {}))
      ?.reduce((accumulatedLanguage, language) => {
        !accumulatedLanguage?.includes(language) &&
          accumulatedLanguage?.push(language);
        return accumulatedLanguage;
      }, [])
      ?.map((language) => {
        const countries = countryList?.filter(
            (country) => country?.languages && country?.languages[language],
          ),
          countriesByName = countries?.map((country) => country?.name?.common),
          totalSpeakers = countries.reduce(
            (sum, country) => sum + country.population,
            0,
          );

        return {
          language,
          countries: countriesByName,
          total_speakers: totalSpeakers,
        };
      });
  }

  /**
   * @statistics
   * This gives statistically analysis of a country
   * @returns
   */
  statistics(countries: Array<any>) {
    const totalCountries = countries.length;
    const largestCountry = countries.reduce((prev, curr) =>
      prev.area > curr.area ? prev : curr,
    );
    const smallestCountry = countries.reduce((prev, curr) =>
      prev.population < curr.population ? prev : curr,
    );
    const languages = this.languages(countries);
    const mostWidelySpokenLanguage = languages.reduce((prev, curr) =>
      prev.total_speakers > curr.total_speakers ? prev : curr,
    );

    return {
      totalCountries,
      largestCountry,
      smallestCountry,
      mostWidelySpokenLanguage: mostWidelySpokenLanguage.language,
    };
  }
}
