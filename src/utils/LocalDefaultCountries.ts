const localID: string = 'default-countries-name';

export default class LocalDefaultCountries {

  static set(countryName: string) {
    countryName = countryName.toLowerCase();
    let countriesNames: any = this.get();
    if (!countriesNames.includes(countryName)) {
      countriesNames.push(countryName);
      localStorage.setItem(localID, JSON.stringify(countriesNames));
    }
    return countriesNames;
  }

  static get(): Array<string> {
    let local: any = localStorage.getItem(localID);
    if (local) {
      local = JSON.parse(local);
      return local;
    }
    return [];
  }

  static remove(countryName: string) {
    countryName = countryName.toLowerCase();
    let nCountries: any = this.get().filter((c: string) => !c.startsWith(countryName));
    localStorage.setItem(localID, JSON.stringify(nCountries));
    return nCountries;
  }
}