import formatNumber from './util';

export function Header (country, date) {
  return `
    <h3 class="m-0">${country}</h3>
    <small class="mb-10">${new Date(date).toString().slice(0, 15)}</small> 
    <p>We hope you are staying healthy and safe.</p>
  `;
}

export function Item (resp) {
  return `   
  <div class="details">

    <div class="d-flex-column">
      <img src=${resp.countryInfo.flag} alt="..." class="mb-5"  />
      <span class="ellipsis scale">${resp.country}</span>
    </div>

    <div class="d-flex-column">
      <span class="cl-blue-sky">Total Cases</span>
      <span class="scale">${formatNumber(resp.cases)}</span>
    </div>

    <div class="d-flex-column">
      <span class="cl-blue-sky">total deaths</span>
      <span class="scale">${formatNumber(resp.deaths)}</span>
    </div>

    <div class="d-flex-column">
      <span class="cl-blue-sky">Total recovered</span>
      <span class="scale">${formatNumber(resp.recovered)}</span>
    </div>

    <div class="d-flex-column">
      <span class="cl-blue-sky">today Cases</span>
      <span class="scale">${formatNumber(resp.todayCases)}</span>
    </div>

    <div class="d-flex-column">
      <span class="cl-blue-sky">today Deaths</span>
      <span class="scale">${formatNumber(resp.todayDeaths)}</span>
    </div>
      
    </div>`
}

export function StatsElements (totalTodayCases,totalTodayDeaths, totalCases, totalDeaths, totalRecovered) {
  return `
  <div class="d-flex-column"> 
    <h3 class="cl-rose mb-0">total today cases</h3>
    <h3>${formatNumber(totalTodayCases)}</h3>
  </div>

  <div class="d-flex-column"> 
    <h3 class="cl-rose mb-0">total today deaths</h3>
    <h3>${formatNumber(totalTodayDeaths)}</h3>
  </div>
  
  <div class="details m-0">    

    <div class="d-flex-column"> 
      <span class="cl-blue-sky">total cases</span>
      <p class="m-0">${formatNumber(totalCases)}</p>
    </div>

    <div class="d-flex-column">
      <span class="cl-blue-sky">total deaths</span>
      <p class="m-0">${formatNumber(totalDeaths)}</p>
    </div>

    <div class="d-flex-column">
      <span class="cl-blue-sky">total recovered</span>
      <p class="m-0">${formatNumber(totalRecovered)}</p>
    </div>
  </div>`;
}