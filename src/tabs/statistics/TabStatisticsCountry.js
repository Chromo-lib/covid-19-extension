import React, { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../state/GlobalState';
import CovidService from '../../CovidService';
import Spinner from '../../components/Spinner';
import EnglishMonths from '../../utils/EnglishMonths';
import LocalDefaultCountries from '../../utils/LocalDefaultCountries';

const CountryChart = lazy(() => import('./CountryChart'));
const CountryInfos = lazy(() => import('./CountryInfos'));

export default function TabStatisticsCountry() {

  const { globalState, setGloablState } = useContext(GlobalContext);
  const { clickedCountry, allCountries, defaultCountries } = globalState;

  const [countryStats, setCountryStats] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(100);

  useEffect(() => {
    if (clickedCountry) {
      CovidService.statsByCountry(clickedCountry.country)
        .then(resp => {
          const currentMonth = +new Date().getMonth();
          let res = {};
          Object.keys(resp).map(key => {
            if(currentMonth+1 > key) res[key] = resp[key]
          });
          
          setCountryStats(res);
        })
        .catch(err => { console.log(err); });
    }
  }, [clickedCountry.country]);

  const onSelectMonth = (e) => {
    setSelectedMonth(e.target.value);
  }

  const onPinCountryToHomeTab = () => {
    const { country } = clickedCountry;
    let isN = defaultCountries.some((cnt) => cnt.country === country);
    if (!isN) {
      let nd = allCountries.find((cnt) => cnt.country === country);
      setGloablState({
        ...globalState,
        defaultCountries: [nd, ...defaultCountries], currentTabId: 0, tabName: 'home'
      });
      LocalDefaultCountries.add(country);
    }
    else {
      setGloablState({ ...globalState, currentTabId: 0, tabName: 'home' });
    }
  }

  return (<div className="w-100 content p-10">

    <button className="w-100 mb-10" title="Pin To Home Tab" onClick={onPinCountryToHomeTab}>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 384 512"><path fill="#000" d="M298.028 214.267L285.793 96H328c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v48c0 13.255 10.745 24 24 24h42.207L85.972 214.267C37.465 236.82 0 277.261 0 328c0 13.255 10.745 24 24 24h136v104.007c0 1.242.289 2.467.845 3.578l24 48c2.941 5.882 11.364 5.893 14.311 0l24-48a8.008 8.008 0 0 0 .845-3.578V352h136c13.255 0 24-10.745 24-24-.001-51.183-37.983-91.42-85.973-113.733z" /></svg>
      <span className="text-uppercase">Pin {clickedCountry.country} to home tab</span>
    </button>

    <Suspense fallback={<Spinner />}>
      <CountryInfos clickedCountry={clickedCountry} />
    </Suspense>

    {countryStats && <div className="w-100 py-10">
      <select className="w-100 uppercase" name="months" onChange={onSelectMonth}>
        <option value={100}>all months</option>
        {Object.keys(countryStats).map((k) => <option key={k} value={k}>{EnglishMonths[k]}</option>)}
      </select>

      <Suspense fallback={<Spinner />}>
        <CountryChart countryStats={countryStats} selectedMonth={selectedMonth} />
      </Suspense>
    </div>}
  </div>);
}
