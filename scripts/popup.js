import DomUtils from './DomUtils';
import CovidService from './CovidService';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

let itemsPerLoad = 10;

let allCountries = [];
let defaultCountryDetails = {};
let defaultCountryName = 'tunisia';

const navTabs = document.getElementById('nav');
let statsTabEl = document.getElementById('tab-stats');
const listCountriesEL = document.getElementById('list-countries');
const formChangeCountry = document.getElementById('form-change-country');
const btnLoadMore = document.getElementById('btn-load-more');

chrome.storage.local.get(['defaultCountryName'], function (result) {

  initElmns({ showForm: 'none', showBtnMore: 'none' });

  if (result && result.defaultCountryName) {
    CovidService.fetchData(result.defaultCountryName).then(country => {
      defaultCountryName = result.defaultCountryName;
      defaultCountryDetails = country;
      DomUtils.setHeader(defaultCountryName);
      DomUtils.createListCountries(listCountriesEL, country);
    }).catch(e => {
      chrome.storage.local.set({ defaultCountryName: 'tunisia' });
      window.location.reload();
    });
  }
  else {
    CovidService.fetchData().then(country => {
      defaultCountryDetails = country;
      DomUtils.setHeader(defaultCountryName);
      DomUtils.createListCountries(listCountriesEL, country);
    }).catch(e => { });
  }
});

function onTabChange (e) {
  switch (e.target.id || e.target.parentNode.id) {
    case 'all':
      initElmns({ showHeader: false, showForm: 'none', showBtnMore: 'block', showStatsTabEl: 'none' });
      if (allCountries.length > 0) {
        createTabAll();
      }
      CovidService.fetchData('').then(countries => {
        allCountries = countries.slice(0);
        createTabAll();
      });
      break;

    case 'settings':
      initElmns({ showHeader: false, showForm: 'block', showBtnMore: 'none', showStatsTabEl: 'none' });
      let alertEl = document.getElementById('alert');

      formChangeCountry.addEventListener('submit', (e) => {
        e.preventDefault();
        let countryName = e.target.elements[0].value;
        if (/^[a-zA-Z]+$/.test(countryName)) {
          e.target.elements[0].disabled = true;
          e.target.elements[1].disabled = true;
          e.target.elements[1].textContent = 'Changed';
          e.target.elements[1].classList.add('bg-bleu');
          alertEl.style.display = 'none';
          chrome.storage.local.set({ defaultCountryName: countryName });
          window.location.reload();
        }
        else {
          alertEl.style.display = 'block';
          alertEl.textContent = 'Invalid country name';
        }
      }, false);
      break;

    case 'stats':
      initElmns({ showHeader: false, showForm: 'none', showBtnMore: 'none', showStatsTabEl: 'flex' });
      if (allCountries.length > 0) {
        setStatsTab();
      }
      else {
        CovidService.fetchData('').then(countries => {
          allCountries = countries.slice(0);
          setStatsTab();
        });
      }
      break;

    default:
      initElmns({ showHeader: true, showForm: 'none', showBtnMore: 'none', showStatsTabEl: 'none' });
      defaultCountryDetails && DomUtils.createListCountries(listCountriesEL, defaultCountryDetails);
      break;
  }

  Array.from(navTabs.children).forEach(el => {
    el.classList.remove('active-tab');
  });

  if (e.target.id) e.target.classList.add('active-tab');
  else e.target.parentNode.classList.add('active-tab');
}

function initElmns ({ showHeader, showForm, showBtnMore, showStatsTabEl }) {
  formChangeCountry.style.display = showForm;
  btnLoadMore.style.display = showBtnMore;
  listCountriesEL.innerHTML = '';
  DomUtils.hideHeader(showHeader);
  statsTabEl.style.display = showStatsTabEl;
}

function setStatsTab () {
  let totalCases = allCountries.reduce((a, c) => a + c.cases, 0);
  let totalDeaths = allCountries.reduce((a, c) => a + c.deaths, 0);
  let totalRecovered = allCountries.reduce((a, c) => a + c.recovered, 0);

  let deathsCases = parseInt((totalDeaths / totalCases) * 100, 10);
  let recoveredCases = parseInt((totalRecovered / totalCases) * 100, 10);

  let todayCases = allCountries.reduce((a, c) => a + c.todayCases, 0);
  let todayDeaths = allCountries.reduce((a, c) => a + c.todayDeaths, 0);
  let todayRecovered = allCountries.reduce((a, c) => a + c.todayRecovered, 0);

  statsTabEl.innerHTML = `
  <ul class="w-100">
  <li class="d-flex-col li-bordred"><span class="txt-bleu mb-5">total today cases</span> ${DomUtils.formatNumber(todayCases)}</li>
  <li class="d-flex-col li-bordred"><span class="txt-bleu mb-5">total today cases</span> ${DomUtils.formatNumber(todayDeaths)}</li>
  <li class="d-flex-col li-bordred"><span class="txt-bleu mb-5">total today Recovered</span> ${DomUtils.formatNumber(todayRecovered)}</li>
  </ul>

  <ul class="w-100">
  <li class="d-flex-col li-bordred"><span class="txt-bleu mb-5">total cases</span> ${DomUtils.formatNumber(totalCases)}</li>
  <li class="d-flex-col li-bordred"><span class="txt-bleu mb-5">total deaths</span> ${DomUtils.formatNumber(totalDeaths)}</li>
  <li class="d-flex-col li-bordred"><span class="txt-bleu mb-5">total Recovered</span> ${DomUtils.formatNumber(totalRecovered)}</li>  
  </ul>
  
  <ul class="w-100">
    <li class="li-bordred d-flex-col">
      <div class="ct-chart ct-perfect-fourth"></div>
      <span>total Recovered ${DomUtils.formatNumber(totalRecovered)}</span>
      <span class="txt-red">total Deaths ${DomUtils.formatNumber(totalDeaths)}</span>
    </li>
    <li class="li-bordred d-flex-col">
      <div class="ct-chartt ct-perfect-fourth"></div>
      <span>today Recovered ${DomUtils.formatNumber(todayRecovered)}</span>
      <span class="txt-red">today Deaths ${DomUtils.formatNumber(todayDeaths)}</span>
    </li>
  </ul>
  
  <ul class="w-100">
  <li class="d-flex-col li-bordred"><span class="txt-bleu mb-5">total deaths/<br >total cases</span> ${deathsCases}%</li>
  <li class="d-flex-col li-bordred"><span class="txt-bleu mb-5">total Recovered/<br >total cases</span> ${recoveredCases}%</li>
  </ul>`;

  new Chartist.Pie('.ct-chart', { series: [totalRecovered, totalDeaths] }, { showLabel: false });
  new Chartist.Pie('.ct-chartt', { series: [todayRecovered, todayDeaths] }, { showLabel: false });
}

function createTabAll () {
  allCountries
    .sort((i, j) => +j.cases - +i.cases)
    .slice(0, itemsPerLoad)
    .forEach(countryDetails => {
      DomUtils.createListCountries(listCountriesEL, countryDetails);
    });

  btnLoadMore.addEventListener('click', () => {
    itemsPerLoad += 10;

    btnLoadMore.style.display = 'block';
    listCountriesEL.innerHTML = '';

    allCountries
      .sort((i, j) => +j.cases - +i.cases)
      .slice(0, itemsPerLoad)
      .forEach(countryDetails => {
        DomUtils.createListCountries(listCountriesEL, countryDetails);
      });
  }, false);
}

navTabs.addEventListener('click', onTabChange, false);