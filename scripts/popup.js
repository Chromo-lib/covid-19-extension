import createListCountries from './util';
import CovidService from './CovidService';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

let itemsPerLoad = 10;

let allCountries = [];
let userCountryDetails = null;

const navTabs = document.getElementById('nav');
const listCountriesEL = document.getElementById('list-countries');
const formChangeCountry = document.getElementById('form-change-country');
const btnLoadMore = document.getElementById('btn-load-more');

chrome.storage.local.get(['userCountryName'], function (result) {
  
  initElmns({ showForm: 'none', showBtnMore: 'none' });

  if (result && result.userCountryName) {
    CovidService.fetchData(result.userCountryName).then(country => {
      userCountryDetails = country;
      createListCountries(listCountriesEL, country);
    }).catch(e => {
      chrome.storage.local.set({ userCountryName: 'tunisia' });
    });
  }
  else {
    CovidService.fetchData().then(country => {
      userCountryDetails = country;
      createListCountries(listCountriesEL, country);
    }).catch(e => { });
  }
});

navTabs.addEventListener('click', (e) => {
  switch (e.target.id || e.target.parentNode.id) {
    case 'all':
      CovidService.fetchData('').then(countries => {
        initElmns({ showForm: 'none', showBtnMore: 'block' });
        allCountries = countries.slice(0);

        countries
          .sort((i, j) => +j.cases - +i.cases)
          .slice(0, itemsPerLoad)
          .forEach(countryDetails => {
            createListCountries(listCountriesEL, countryDetails);
          });

        btnLoadMore.addEventListener('click', () => {
          itemsPerLoad += 10;

          btnLoadMore.style.display = 'block';
          listCountriesEL.innerHTML = '';

          allCountries
            .sort((i, j) => +j.cases - +i.cases)
            .slice(0, itemsPerLoad)
            .forEach(countryDetails => {
              createListCountries(listCountriesEL, countryDetails);
            });
        }, false);
      });
      break;

    case 'settings':
      initElmns({ showForm: 'block', showBtnMore: 'none' });

      formChangeCountry.addEventListener('submit', (e) => {
        e.preventDefault();
        e.target.elements[0].disabled = true;
        e.target.elements[1].disabled = true;
        e.target.elements[1].textContent = 'Changed';
        e.target.elements[1].classList.add('bg-bleu');
        chrome.storage.local.set({ userCountryName: e.target.elements[0].value });
      }, false);
      break;

    default:
      initElmns({ showForm: 'none', showBtnMore: 'none' });
      createListCountries(listCountriesEL, userCountryDetails);
      break;
  }

  Array.from(navTabs.children).forEach(el => {
    el.classList.remove('active-tab');
  });

  if (e.target.id) e.target.classList.add('active-tab');
  else e.target.parentNode.classList.add('active-tab');
}, false);

function initElmns ({ showForm, showBtnMore }) {
  formChangeCountry.style.display = showForm;
  btnLoadMore.style.display = showBtnMore;
  listCountriesEL.innerHTML = '';
}