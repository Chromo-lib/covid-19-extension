document.addEventListener('DOMContentLoaded', function () {

  let countryName = 'tunisia';
  let countries = [];
  let nbCountries = 0; // number of countries to be fetched first time
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
    } catch (error) {
      console.log(error);
    }
  }

  document.getElementById('countries').addEventListener('click', getAllCountries, false);
  btnLoadMore && btnLoadMore.addEventListener('click', getAllCountries, false);
});
