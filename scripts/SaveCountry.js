import CovidService from './CovidService';

export default function SaveCountry () {

  let btnSetCountry = document.getElementById('set-country');
  let btnSave = document.querySelector('.btn-save');
  let btnClose = document.querySelector('.btn-close');

  chrome.storage.local.get(['country'], async (result) => {
    try {
      let resp = await CovidService(result.country);
      document.getElementById('curr-country').src = resp.countryInfo.flag;
    } catch (error) { }
  });

  function openHideModal () {
    let inputContainer = document.querySelector('.input-container');

    if (inputContainer.classList.contains('d-flex-col-center')) {
      inputContainer.classList.remove('d-flex-col-center');
      inputContainer.classList.add('dip-none');

      chrome.storage.local.get(['country'], function (result) {
        console.log('Value currently is ' + result.country);
      });
    }
    else {
      inputContainer.classList.remove('dip-none');
      inputContainer.classList.add('d-flex-col-center');
    }
  }

  function saveCountry () {
    let inputVal = document.getElementById('input-country');
    chrome.storage.local.set({ country: inputVal.value }, async () => {

      try {
        let resp = await CovidService(inputVal.value);
        document.getElementById('curr-country').src = resp.countryInfo.flag;
      } catch (error) {
        chrome.storage.local.set({ country: 'tunisia' });
      }
    });
  }

  btnSave.addEventListener('click', saveCountry, false);
  btnClose && btnClose.addEventListener('click', openHideModal, false);
  btnSetCountry && btnSetCountry.addEventListener('click', openHideModal, false);
}
