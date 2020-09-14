const localID: string = 'default-countries-name';

export default class LocalDefaultCountries {

  static set(countries: any) {
    localStorage.setItem(localID, JSON.parse(countries))
  }

  static get() {
    return localStorage.getItem(localID)?.toLowerCase() || 'Tunisia';
  }

  static modify() {

  }

}