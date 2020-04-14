document.addEventListener('DOMContentLoaded', function () {

  let countries = [];
  let nbCountries = 0; // number of countries to be fetched first time
  let btnLoadMore = document.getElementById('btn-load-more');

  CovidService('tunisia')
    .then(resp => {      
      let container = document.getElementById('list');
      container.innerHTML = Header(resp.country, resp.updated);
      container.innerHTML += Item(resp);
    });


  async function getAllCountries () {
    
    nbCountries = nbCountries + 10;
    countries = await CovidService('');
    let listCountries = document.getElementById('list-d');
    listCountries.innerHTML = Header('All countries', countries[0].updated);

    countries
      .sort((i, j) => +j.cases - +i.cases)
      .slice(0, nbCountries)
      .forEach(country => {
        listCountries.innerHTML += Item(country);
      });
  }

  document.getElementById('countries').addEventListener('click', getAllCountries, false);
  btnLoadMore && btnLoadMore.addEventListener('click', getAllCountries, false);
});
