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
}