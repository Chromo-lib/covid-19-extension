export default function createListCountries (listCountriesEL, countryDetails) {

  const ulList = document.createElement('ul');
  ulList.innerHTML = createLiInfos(countryDetails).join('');

  const infosWrapper = document.createElement('div');
  infosWrapper.innerHTML = createLiHeader();
  infosWrapper.classList.add('d-flex-col');
  infosWrapper.classList.add('justify-between');
  infosWrapper.appendChild(ulList);

  const container = document.createElement('div');
  container.appendChild(createImg(countryDetails));
  container.appendChild(infosWrapper);

  container.classList.add('d-flex');
  container.classList.add('py-1');
  container.classList.add('border-bottom');

  listCountriesEL.appendChild(container);
}

function createImg (countryDetails) {
  const { countryInfo } = countryDetails;

  const img = document.createElement('img');
  img.src = countryInfo.flag;
  img.alt = countryDetails.country;
  img.classList.add('mb-5');

  const span = document.createElement('span');
  span.textContent = countryDetails.country;
  span.classList.add('truncate');

  const imgContainer = document.createElement('div');
  imgContainer.appendChild(img);
  imgContainer.appendChild(span);

  imgContainer.classList.add('box');

  return imgContainer;
}

function createLiHeader () {
  return `<ul class="txt-bleu mb-5">
    <li>Total Cases</li>
    <li>total deaths</li>
    <li>Total recovered</li>
    <li>today Cases</li>
    <li>today Deaths</li>
    <li>deaths / Cases</li>
  </ul>`;
}

function createLiInfos (cDetails) {
  const {
    cases,
    deaths,
    recovered,
    todayCases,
    todayDeaths
  } = cDetails;

  const infos = {
    cases: formatNumber(cases),
    deaths: formatNumber(deaths),
    recovered: formatNumber(recovered),
    todayCases: formatNumber(todayCases),
    todayDeaths: formatNumber(todayDeaths),
    casesDeaths: parseInt((deaths / cases) * 100, 10) + '%'
  };

  return Object.values(infos).map(v => `<li>${v}</li>`);
}

function formatNumber (x) { // 1000000 -> 1 000 000
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
