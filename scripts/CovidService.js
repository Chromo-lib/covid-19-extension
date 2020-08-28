const BASE_URL = 'https://corona.lmao.ninja/v2/countries';

export default class CovidService {

  static async fetchData (countryName = 'tunisia') {
    try {
      let resp = await fetch(`${BASE_URL}/` + countryName);
      let respJson = await resp.json();
      if (respJson && respJson.message) {
        throw respJson.message;
      }
      return respJson;
    } catch (error) { }
  }
}
