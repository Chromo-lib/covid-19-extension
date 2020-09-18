import React, { useContext, useEffect, useState } from 'react';
import CovidService from '../CovidService';
import { GlobalContext } from '../state/GlobalState';
import EnglishMonths from '../utils/EnglishMonths';
import { Bar } from 'react-chartjs-2';
import LocalDefaultCountries from '../utils/LocalDefaultCountries';

const chartOptions = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        fontColor: 'white'
      },
    }],
    xAxes: [{
      ticks: {
        fontColor: 'white'
      },
    }]
  }
}

const backgroundColor = [
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)'
];

const borderColor = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)'
];

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

export default function TabStatisticsCountry() {

  const { globalState, setGloablState }: any = useContext(GlobalContext);
  const { clickedCountry, allCountries, defaultCountries } = globalState;

  const [countryStats, setCountryStats]: any = useState(null);
  const [selectedMonth, setSelectedMonth]: any = useState(100);

  useEffect(() => {
    CovidService.statsByCountry(clickedCountry)
      .then(resp => {
        setCountryStats(resp);
      })
      .catch(err => { });
  }, [clickedCountry]);

  const onSelectMonth = (e: any) => {
    setSelectedMonth(e.target.value);
  }

  const onAddOrRemove = (actionType: string) => {
    switch (actionType) {
      case 'add':
        let isN = defaultCountries.some((cnt: any) => cnt.country === clickedCountry);
        if (!isN) {
          let nd = allCountries.find((cnt: any) => cnt.country === clickedCountry);
          setGloablState({ ...globalState, defaultCountries: [...defaultCountries, nd], currentTabId: 0 });
          LocalDefaultCountries.set(clickedCountry);
        }
        else {
          window.confirm("Already exists! " + clickedCountry);
        }
        break;

      case 'remove':
        let c = window.confirm("Are you sure to remove? " + clickedCountry);
        if (c) {
          let ndd = defaultCountries.filter((cnt: any) => cnt.country !== clickedCountry);
          setGloablState({ ...globalState, defaultCountries: ndd, currentTabId: 0 });
          LocalDefaultCountries.remove(clickedCountry);
        }
        break;

      default:
        break;
    }
  }

  return (<div className="w-100 content p-10">

    <div className="w-100 d-flex">
      <button className="m-0 bg-inherit bg-bleu">{clickedCountry} Country Statistics</button>
      <button onClick={() => { onAddOrRemove('add') }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="34" fill="none" viewBox="0 0 24 24" stroke="white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>Add to home tab</button>
      <button onClick={() => { onAddOrRemove('remove') }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="34" fill="none" viewBox="0 0 24 24" stroke="#fff">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>Remove from home tab</button>
    </div>

    {countryStats && <>
      <select className="w-100" name="months" onChange={onSelectMonth}>
        <option value={100}>Choose a month</option>
        {Object.keys(countryStats).map((k: any) => <option key={k} value={k}>
          {EnglishMonths[k]}
        </option>)}
      </select>

      <CountryChart countryStats={countryStats} selectedMonth={selectedMonth} />
    </>}

  </div>);
}