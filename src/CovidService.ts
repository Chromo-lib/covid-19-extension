export default class CovidService {

  static async getData() {
    const BASE_URL = 'https://corona.lmao.ninja/v2/countries';

    try {
      let resp = await fetch(BASE_URL);
      let respJson = await resp.json();
      if (respJson && respJson.message) {
        throw respJson.message;
      }

      let countryName = localStorage.getItem('default-country-name')?.toLowerCase() || 'Tunisia';
      let defaultCountries = respJson.filter((c: any) => c.country.toLowerCase().includes(countryName));
      
      if (defaultCountries.length < 1) {
        defaultCountries = respJson.filter((c: any) => c.country.toLowerCase().includes('tunisia'));
      }

      return [
        defaultCountries,
        respJson.sort((i: any, j: any) => j.cases - i.cases)
      ];
    } catch (error) { }
  }

}