import LocalDefaultCountries from "./utils/LocalDefaultCountries";

export default class CovidService {

  static async getData() {
    const BASE_URL = 'https://corona.lmao.ninja/v2/countries';

    try {
      let resp = await fetch(BASE_URL);
      let respJson = await resp.json();
      if (respJson && respJson.message) {
        throw respJson.message;
      }

      let countriesNames = LocalDefaultCountries.get();
      let defaultCountries = countriesNames
        .map(v => respJson.find((k: any) => k.country.toLowerCase().startsWith(v)));

      if (defaultCountries.length < 1) {
        defaultCountries = respJson.filter((c: any) => c.country.toLowerCase().startsWith('tunisia'));
      }

      return [
        defaultCountries,
        respJson.sort((i: any, j: any) => j.cases - i.cases)
      ];
    } catch (error) { }
  }

  static async statsByCountry(countriesName: string) {
    try {
      let countryStats: any = await fetch('https://api.covid19api.com/total/dayone/country/' + countriesName);
      countryStats = await countryStats.json();

      let isLastDay = (dt: Date) => {
        return new Date(dt.getTime() + 86400000).getDate() === 1;
      }

      return countryStats.reduce((result: any, country: any) => {
        let date = new Date(country.Date);
        let lastMonth = new Date().getMonth();

        if (isLastDay(date)) {
          result[date.getMonth()] = {
            Confirmed: country.Confirmed,
            Deaths: country.Deaths,
            Active: country.Active,
            Recovered: country.Recovered
          };
        }

        if (!result[lastMonth]) {
          let lc = countryStats[countryStats.length - 1];

          result[lastMonth] = {
            Confirmed: lc.Confirmed,
            Deaths: lc.Deaths,
            Active: lc.Active,
            Recovered: lc.Recovered
          };
        }
        return result;
      }, {});

    } catch (error) {
      return error.message;
    }
  }
}