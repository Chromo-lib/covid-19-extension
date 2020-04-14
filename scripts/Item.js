function Header(country, date) {
  return `
    <h3 class="m-0">${country}</h3>
    <small class="mb-10">${new Date(date).toString().slice(0, 15)}</small> 
    <p>We hope you are staying healthy and safe.</p>
  `;
}

function Item(resp) {
  return `   
  <div class="details">

    <div class="d-flex-column">
      <img src=${resp.countryInfo.flag} alt="..." class="mb-5"  />
      <span class="ellipsis scale">${resp.country}</span>
    </div>

    <div class="d-flex-column">
      <span class="cl-blue-sky">Total Cases</span>
      <span class="scale">${formatNumer(resp.cases)}</span>
    </div>

    <div class="d-flex-column">
      <span class="cl-blue-sky">total deaths</span>
      <span class="scale">${formatNumer(resp.deaths)}</span>
    </div>

    <div class="d-flex-column">
      <span class="cl-blue-sky">today Cases</span>
      <span class="scale">${formatNumer(resp.todayCases)}</span>
    </div>

    <div class="d-flex-column">
      <span class="cl-blue-sky">today Deaths</span>
      <span class="scale">${formatNumer(resp.todayDeaths)}</span>
    </div>

    <div class="d-flex-column">
      <span class="cl-blue-sky">Total recovered</span>
      <span class="scale">${formatNumer(resp.recovered)}</span>
    </div>
      
    </div>`
}