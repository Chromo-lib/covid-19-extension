import React, { useState, useEffect, Suspense } from 'react';
import CovidService from './CovidService';
import TabWorld from './components/TabWorld';
import TabHome from './components/TabHome';
import LocalDefaultCountries from './utils/LocalDefaultCountries';
import { commarize } from './utils/FormatNum';

const TabStatistics = React.lazy(() => import('./components/TabStatistics'));

let chrome: any = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
  ? (window as any).chrome : (window as any).browser;

const tabsIcons = [
  <svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 576 512"><path fill="#fff" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"></path></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 496 512"><path fill="#fff" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm200 248c0 22.5-3.9 44.2-10.8 64.4h-20.3c-4.3 0-8.4-1.7-11.4-4.8l-32-32.6c-4.5-4.6-4.5-12.1.1-16.7l12.5-12.5v-8.7c0-3-1.2-5.9-3.3-8l-9.4-9.4c-2.1-2.1-5-3.3-8-3.3h-16c-6.2 0-11.3-5.1-11.3-11.3 0-3 1.2-5.9 3.3-8l9.4-9.4c2.1-2.1 5-3.3 8-3.3h32c6.2 0 11.3-5.1 11.3-11.3v-9.4c0-6.2-5.1-11.3-11.3-11.3h-36.7c-8.8 0-16 7.2-16 16v4.5c0 6.9-4.4 13-10.9 15.2l-31.6 10.5c-3.3 1.1-5.5 4.1-5.5 7.6v2.2c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8s-3.6-8-8-8H247c-3 0-5.8 1.7-7.2 4.4l-9.4 18.7c-2.7 5.4-8.2 8.8-14.3 8.8H194c-8.8 0-16-7.2-16-16V199c0-4.2 1.7-8.3 4.7-11.3l20.1-20.1c4.6-4.6 7.2-10.9 7.2-17.5 0-3.4 2.2-6.5 5.5-7.6l40-13.3c1.7-.6 3.2-1.5 4.4-2.7l26.8-26.8c2.1-2.1 3.3-5 3.3-8 0-6.2-5.1-11.3-11.3-11.3H258l-16 16v8c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8v-20c0-2.5 1.2-4.9 3.2-6.4l28.9-21.7c1.9-.1 3.8-.3 5.7-.3C358.3 56 448 145.7 448 256zM130.1 149.1c0-3 1.2-5.9 3.3-8l25.4-25.4c2.1-2.1 5-3.3 8-3.3 6.2 0 11.3 5.1 11.3 11.3v16c0 3-1.2 5.9-3.3 8l-9.4 9.4c-2.1 2.1-5 3.3-8 3.3h-16c-6.2 0-11.3-5.1-11.3-11.3zm128 306.4v-7.1c0-8.8-7.2-16-16-16h-20.2c-10.8 0-26.7-5.3-35.4-11.8l-22.2-16.7c-11.5-8.6-18.2-22.1-18.2-36.4v-23.9c0-16 8.4-30.8 22.1-39l42.9-25.7c7.1-4.2 15.2-6.5 23.4-6.5h31.2c10.9 0 21.4 3.9 29.6 10.9l43.2 37.1h18.3c8.5 0 16.6 3.4 22.6 9.4l17.3 17.3c3.4 3.4 8.1 5.3 12.9 5.3H423c-32.4 58.9-93.8 99.5-164.9 103.1z"></path></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 512 512"><path fill="#fff" d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path></svg>
];

const tabs = [
  { id: 0, name: 'home', icon: tabsIcons[0] },
  { id: 1, name: 'world', icon: tabsIcons[1] },
  { id: 2, name: 'statistics', icon: tabsIcons[2] }
];

function App() {

  const [defaultCountries, setDefaultCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [currentTabId, setCurrentTabId] = useState(0);

  const onTabChange = (currentTabId: number) => {
    setCurrentTabId(currentTabId);
  }

  useEffect(() => {
    CovidService.getData()
      .then((countries: any) => {

        setDefaultCountries(countries[0]);
        setAllCountries(countries[1]);

        chrome.browserAction.setBadgeText({ text: '+' + commarize(countries[0][0].todayCases) });
      })
      .catch(e => { });
  }, []);

  const onCtxMenu = (action: string, countryName: string) => {
    switch (action) {
      case 'add':
        let countriesNames = LocalDefaultCountries.set(countryName);
        let res = countriesNames.map((c: any) => allCountries.find((a: any) => a.country.toLowerCase() === c));
        setDefaultCountries(res);
        setCurrentTabId(0)
        break;

      case 'remove':
        let nCountriesNames = LocalDefaultCountries.remove(countryName);
        let nres = nCountriesNames.map((c: any) => allCountries.find((a: any) => a.country.toLowerCase() === c));
        setDefaultCountries(nres);
        break;

      default:
        break;
    }
  }

  return (
    <div className="App">

      <ul className="tabs d-flex col-3 bg-light-dark">
        {tabs.map(tab => <li key={tab.id}
          onClick={() => { onTabChange(tab.id) }}
          className={currentTabId === tab.id ? 'active-tab' : ''}>
          {tab.icon}{tab.name}</li>)}
      </ul>

      <Suspense fallback={<div>Loading...</div>}>
        {allCountries.length > 0
          && (currentTabId === 0
            ? <TabHome defaultCountries={defaultCountries} onCtxMenu={onCtxMenu} tabName="home" />
            : currentTabId === 1
              ? <TabWorld allCountries={allCountries} onCtxMenu={onCtxMenu} tabName="world" />
              : <TabStatistics />)}
      </Suspense>
    </div>
  );
}

export default App;
