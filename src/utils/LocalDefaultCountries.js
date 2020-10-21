const localID = 'default-countries-name';

export default class LocalDefaultCountries {

  static add(countryName) {
    countryName = countryName.toLowerCase();
    let countriesNames = this.get();
    if (!countriesNames.includes(countryName)) {
      countriesNames.push(countryName);
      localStorage.setItem(localID, JSON.stringify(countriesNames));
    }
    return countriesNames;
  }

  static get() {
    let local = localStorage.getItem(localID);
    if (local) {
      local = JSON.parse(local);
      return local;
    }
    return [];
  }

  static remove(countryName) {
    countryName = countryName.toLowerCase();
    let nCountries = this.get().filter((c) => !c.startsWith(countryName));
    localStorage.setItem(localID, JSON.stringify(nCountries));
    return nCountries;
  }

  static replace(nCountries) {
    localStorage.setItem(localID, JSON.stringify(nCountries));
  }
}