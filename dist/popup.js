!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";function e(e,a){const n=document.createElement("ul");n.innerHTML=function(e){const{cases:a,deaths:n,recovered:s,todayCases:o,todayDeaths:c}=e,r={cases:t(a),deaths:t(n),recovered:t(s),todayCases:t(o),todayDeaths:t(c),casesDeaths:parseInt(n/a*100,10)+"%"};return Object.values(r).map(e=>`<li>${e}</li>`)}(a).join("");const s=document.createElement("div");s.innerHTML='<ul class="txt-bleu mb-5">\n    <li>Total Cases</li>\n    <li>total deaths</li>\n    <li>Total recovered</li>\n    <li>today Cases</li>\n    <li>today Deaths</li>\n    <li>deaths / Cases</li>\n  </ul>',s.classList.add("d-flex-col"),s.classList.add("justify-between"),s.appendChild(n);const o=document.createElement("div");o.appendChild(function(e){const{countryInfo:t}=e,a=document.createElement("img");a.src=t.flag,a.alt=e.country,a.classList.add("mb-5");const n=document.createElement("span");n.textContent=e.country,n.classList.add("truncate");const s=document.createElement("div");return s.appendChild(a),s.appendChild(n),s.classList.add("box"),s}(a)),o.appendChild(s),o.classList.add("d-flex"),o.classList.add("py-1"),o.classList.add("border-bottom"),e.appendChild(o)}function t(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}const a="https://corona.lmao.ninja/v2/countries";class n{static async fetchData(e="tunisia"){try{let t=await fetch(a+"/"+e);return await t.json()}catch(e){let t=await fetch(a+"/tunisia");return await t.json()}}}let s=/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor);chrome=s?chrome:browser;let o=10,c=[],r=null;const l=document.getElementById("nav"),d=document.getElementById("list-countries"),i=document.getElementById("form-change-country"),u=document.getElementById("btn-load-more");function m({showForm:e,showBtnMore:t}){i.style.display=e,u.style.display=t,d.innerHTML=""}chrome.storage.local.get(["userCountryName"],(function(t){m({showForm:"none",showBtnMore:"none"}),t&&t.userCountryName?n.fetchData(t.userCountryName).then(t=>{r=t,e(d,t)}).catch(e=>{chrome.storage.local.set({userCountryName:"tunisia"})}):n.fetchData().then(t=>{r=t,e(d,t)}).catch(e=>{})})),l.addEventListener("click",t=>{switch(t.target.id||t.target.parentNode.id){case"all":n.fetchData("").then(t=>{m({showForm:"none",showBtnMore:"block"}),c=t.slice(0),t.sort((e,t)=>+t.cases-+e.cases).slice(0,o).forEach(t=>{e(d,t)}),u.addEventListener("click",()=>{o+=10,u.style.display="block",d.innerHTML="",c.sort((e,t)=>+t.cases-+e.cases).slice(0,o).forEach(t=>{e(d,t)})},!1)});break;case"settings":m({showForm:"block",showBtnMore:"none"}),i.addEventListener("submit",e=>{e.preventDefault(),e.target.elements[0].disabled=!0,e.target.elements[1].disabled=!0,e.target.elements[1].textContent="Changed",e.target.elements[1].classList.add("bg-bleu"),chrome.storage.local.set({userCountryName:e.target.elements[0].value})},!1);break;default:m({showForm:"none",showBtnMore:"none"}),e(d,r)}Array.from(l.children).forEach(e=>{e.classList.remove("active-tab")}),t.target.id?t.target.classList.add("active-tab"):t.target.parentNode.classList.add("active-tab")},!1)}));
