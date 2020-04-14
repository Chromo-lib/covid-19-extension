const btnTabs = document.querySelectorAll('.tabs>button');
const tabsItems = document.querySelectorAll('.tabs-items>ul');

let tabId = '';
let btnLoadMore = document.getElementById('btn-load-more');

btnTabs.forEach(btn => {

  btn.addEventListener('click', () => {
    tabId = btn.id;

    tabsItems.forEach(tab => {
      tab.style.display = 'none';
      let tabItemId = tab.getAttribute('data-id');

      if (tabItemId === tabId) {
        btnLoadMore.style.display = tabItemId === 'countries' ? 'block' : 'none';
        tab.style.display = 'block';
      }
    })
  })

})