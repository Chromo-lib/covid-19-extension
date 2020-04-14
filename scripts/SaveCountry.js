document.addEventListener('DOMContentLoaded', function () {

  let btnSetCountry = document.getElementById('set-country');
  let btnSave = document.querySelector('.btn-save');
  let btnClose = document.querySelector('.btn-close');

  function openHideModal () {
    let inputContainer = document.querySelector('.input-container');

    if (inputContainer.classList.contains('d-flex-col-center')) {
      inputContainer.classList.remove('d-flex-col-center');
      inputContainer.classList.add('dip-none');

      chrome.storage.sync.get(['country'], function (result) {
        console.log('Value currently is ' + result.country);
      });
    }
    else {
      inputContainer.classList.remove('dip-none');
      inputContainer.classList.add('d-flex-col-center');      
    }
  }

  function saveCountry() {
    let inputVal = document.getElementById('input-country');
    chrome.storage.sync.set({ country: inputVal.value }, () => { });
  }

  btnSave.addEventListener('click', saveCountry, false);
  btnClose && btnClose.addEventListener('click', openHideModal, false);
  btnSetCountry.addEventListener('click', openHideModal, false);
});

