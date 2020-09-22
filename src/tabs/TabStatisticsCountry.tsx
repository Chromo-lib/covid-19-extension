import React, { useContext, useEffect, useState } from 'react';
import CovidService from '../CovidService';
import { GlobalContext } from '../state/GlobalState';
import EnglishMonths from '../utils/EnglishMonths';
import { Bar } from 'react-chartjs-2';
import LocalDefaultCountries from '../utils/LocalDefaultCountries';
import { FormatNum } from '../utils/FormatNum';
import { backgroundColor, borderColor } from '../utils/ChartColors';

const chartOptions = {
  scales: {
    yAxes: [{
      ticks: {
        display:false,
        beginAtZero: true,
        fontColor: 'white'
      },
    }],
    xAxes: [{
      ticks: {
        display:false,
        fontColor: 'white'
      },
    }]
  }
}

const CountryChart = ({ countryStats, selectedMonth }: any) => {

  const [state, setState]: any = useState(null);

  useEffect(() => {
    if (selectedMonth !== 100 && countryStats[selectedMonth]) {
      let cm = countryStats[selectedMonth];
      setState({
        labels: ['Deaths', 'Confirmed', 'Active', 'Recovered'],
        datasets: [{
          label: 'Statistics for ' + EnglishMonths[selectedMonth],
          data: [cm.Deaths, cm.Confirmed, cm.Active, cm.Recovered],
          backgroundColor,
          borderColor
        }]
      });
    }
    else {
      setState({
        labels: Object.keys(countryStats).map((r: any) => EnglishMonths[r]),
        datasets: [{
          label: 'Confirmed ',
          data: Object.values(countryStats).map((r: any) => r.Confirmed),
          backgroundColor: backgroundColor[1],
          borderColor: borderColor[1]
        },
        {
          label: 'Deaths ',
          data: Object.values(countryStats).map((r: any) => r.Deaths),
          backgroundColor: backgroundColor[0],
          borderColor: borderColor[0]
        },
        {
          label: 'Active ',
          data: Object.values(countryStats).map((r: any) => r.Active),
          backgroundColor: backgroundColor[2],
          borderColor: borderColor[2]
        },
        {
          label: 'Recovered ',
          data: Object.values(countryStats).map((r: any) => r.Recovered),
          backgroundColor: backgroundColor[3],
          borderColor: borderColor[3]
        }]
      })
    }
  }, [selectedMonth]);

  return <>
    {state && <Bar
      data={state}
      height={270}
      legend={{ labels: { fontColor: "white" } }}
      options={chartOptions}
    />}
  </>
}

const CountryInfos = ({ clickedCountry }: any) => {
  return <div className="w-100">
    <ul className="w-100 d-flex col-4 fs-10" style={{ flexWrap: 'wrap' }}>
      <li className="d-flex-col bg-bleu"><span>country</span><span>{clickedCountry.country}</span></li>
      <li className="d-flex-col bg-bleu"><span>continent</span><span>{clickedCountry.continent}</span></li>
      <li className="d-flex-col bg-bleu"><span>population</span><span>{FormatNum(clickedCountry.population)}</span></li>
    </ul>

    <ul className="w-100 d-flex col-4 fs-10" style={{ flexWrap: 'wrap' }}>
      <li className="d-flex-col"><span>cases</span><span>{FormatNum(clickedCountry.cases)}</span></li>
      <li className="d-flex-col"><span>active</span><span>{FormatNum(clickedCountry.active)}</span></li>
      <li className="d-flex-col bg-red"><span>critical</span><span>{FormatNum(clickedCountry.critical)}</span></li>
      <li className="d-flex-col bg-red"><span>deaths</span><span>{FormatNum(clickedCountry.deaths)}</span></li>
      <li className="d-flex-col bg-green"><span>recovered</span><span>{FormatNum(clickedCountry.recovered)}</span></li>

      <li className="d-flex-col bg-red"><span>today deaths</span><span>{FormatNum(clickedCountry.todayDeaths)}</span></li>
      <li className="d-flex-col"><span>today cases</span><span>{FormatNum(clickedCountry.todayCases)}</span></li>
      <li className="d-flex-col bg-green"><span>today recovered</span><span>{FormatNum(clickedCountry.todayRecovered)}</span></li>
    </ul>
  </div>
}

export default function TabStatisticsCountry() {

  const { globalState, setGloablState }: any = useContext(GlobalContext);
  const { clickedCountry, allCountries, defaultCountries } = globalState;

  const [countryStats, setCountryStats]: any = useState(null);
  const [selectedMonth, setSelectedMonth]: any = useState(100);

  useEffect(() => {
    if (clickedCountry) {
      CovidService.statsByCountry(clickedCountry.country)
        .then(resp => {
          setCountryStats(resp);
        })
        .catch(err => { });
    }
  }, [clickedCountry.country]);


  const onSelectMonth = (e: any) => {
    setSelectedMonth(e.target.value);
  }

  const onAddOrRemove = (actionType: string) => {
    const { country } = clickedCountry;
    switch (actionType) {
      case 'add':
        let isN = defaultCountries.some((cnt: any) => cnt.country === country);
        if (!isN) {
          let nd = allCountries.find((cnt: any) => cnt.country === country);
          setGloablState({ ...globalState, defaultCountries: [...defaultCountries, nd], currentTabId: 0, tabName: 'home' });
          LocalDefaultCountries.add(country);
        }
        else {
          window.confirm("Already exists! " + country);
        }
        break;

      case 'remove':
        let c = window.confirm("Are you sure to remove? " + country);
        if (c) {
          let ndd = defaultCountries.filter((cnt: any) => cnt.country !== country);
          setGloablState({ ...globalState, defaultCountries: ndd, currentTabId: 0, tabName: 'home' });
          LocalDefaultCountries.remove(country);
        }
        break;

      default:
        break;
    }
  }

  return (<div className="w-100 content p-10">

    <div className="w-100 d-flex mb-10">
      <button onClick={() => { onAddOrRemove('add') }} >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" fill="none" viewBox="0 0 24 24" stroke="black">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>Add to home tab</button>
      <button onClick={() => { onAddOrRemove('remove') }} >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" fill="none" viewBox="0 0 24 24" stroke="black">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>Remove from home tab</button>
    </div>

    {clickedCountry && <CountryInfos clickedCountry={clickedCountry} />}

    {countryStats && <div className="w-100 py-10">
      <select className="w-100" name="months" onChange={onSelectMonth}>
        <option value={100}>Choose a month</option>
        {Object.keys(countryStats).map((k: any) => <option key={k} value={k}>
          {EnglishMonths[k]}
        </option>)}
      </select>

      <CountryChart countryStats={countryStats} selectedMonth={selectedMonth} />

    </div>}
  </div>);
}
