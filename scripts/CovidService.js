const BASE_URL = 'https://corona.lmao.ninja/v2/countries';

export default class CovidService {
  static async fetchData (country = 'tunisia') {
    try {
      let resp = await fetch(`${BASE_URL}/` + country);
      let respJson = await resp.json();
      return respJson;
    } catch (error) {
      let resp = await fetch(`${BASE_URL}/tunisia`);
      let respJson = await resp.json();
      return respJson;
    }
  }
}
