import Tabs from './tab';
import SaveCountry from './SaveCountry';
import CovidService from './CovidService';
import { Item, Header, StatsElements } from './Dom';

export default (() => {

  Tabs(); // handling tabs
  SaveCountry(); // popup save country name

  let countryName = 'tunisia';
  let countries = [];
  let nbCountries = 0; // number of countries to be fetched first time
  // countries section: event handling
  let btnLoadMore = document.getElementById('btn-load-more');


  chrome.storage.sync.get(['country'], async (result) => {
    if (result && result.country) countryName = result.country;
    await getCountry(countryName);
  });

  chrome.storage.onChanged.addListener(async (changes) => {
    await getCountry(changes.country.newValue);
  });

  async function getCountry () {
    let resp = await CovidService(countryName)
    let container = document.getElementById('list');
    container.innerHTML = Header(resp.country, resp.updated);
    container.innerHTML += Item(resp);
  }

  async function getAllCountries () {

    nbCountries = nbCountries + 10;
    try {
      countries = await CovidService('');
      let listCountries = document.getElementById('list-d');
      listCountries.innerHTML = Header('All countries', countries[0].updated);

      countries
        .sort((i, j) => +j.cases - +i.cases)
        .slice(0, nbCountries)
        .forEach(country => {
          listCountries.innerHTML += Item(country);
        });

    } catch (error) { }
  }

  async function stats () {
    nbCountries = nbCountries + 10;
    try {
      countries = await CovidService('');
      let statsEl = document.getElementById('list-stats');
      statsEl.innerHTML = Header('Statistics', countries[0].updated);

      const totalTodayCases = countries.reduce((a, c) => a + c.todayCases, 0);
      const totalTodayDeaths = countries.reduce((a, c) => a + c.todayDeaths, 0);

      const totalCases = countries.reduce((a, c) => a + c.cases, 0);
      const totalDeaths = countries.reduce((a, c) => a + c.deaths, 0);
      const totalRecovered = countries.reduce((a, c) => a + c.recovered, 0);

      statsEl.innerHTML += StatsElements(
        totalTodayCases,
        totalTodayDeaths,
        totalCases,
        totalDeaths,
        totalRecovered,
        parseInt((totalRecovered / totalCases) * 100, 10)
      );

    } catch (error) {}
  }


  document.getElementById('stats').addEventListener('click', stats, false);
  document.getElementById('countries').addEventListener('click', getAllCountries, false);
  btnLoadMore && btnLoadMore.addEventListener('click', getAllCountries, false);
})();
