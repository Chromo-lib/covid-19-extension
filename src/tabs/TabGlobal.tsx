import React, { useState, useEffect } from 'react';
import CovidService from '../CovidService';
import { FormatNum } from '../utils/FormatNum';
import SplitUpper from '../utils/SplitUpper';
import { Bar } from 'react-chartjs-2';
import { backgroundColor, borderColor } from '../utils/ChartColors';

const chartOptions = {
  scales: {
    yAxes: [{
      stacked: true,
      ticks: {
        beginAtZero: true
      }
    }],
    xAxes: [{
      stacked: true,
      ticks: {
        beginAtZero: true
      }
    }]

  }
}

export default function TabGlobal() {

  const [state, setState]: any = useState({ globalStats: null, chartDataTotal: null });

  useEffect(() => {
    Promise.all([CovidService.summury(), CovidService.statsByContents()])
      .then(([{ Global }, continents]) => {

        let chartDataTotal = {
          labels: continents.map((c: any) => c.continent),
          datasets: [
            {
              label: 'Cases',
              data: continents.map((c: any) => c.cases),
              backgroundColor: backgroundColor[1],
              borderColor: borderColor[1]
            },
            {
              label: 'Recovered',
              data: continents.map((c: any) => c.recovered),
              backgroundColor: backgroundColor[3],
              borderColor: borderColor[3]
            },
            {
              label: 'Deaths',
              data: continents.map((c: any) => c.deaths),
              backgroundColor: backgroundColor[0],
              borderColor: borderColor[0]
            },
            {
              label: 'Active',
              data: continents.map((c: any) => c.active),
              backgroundColor: backgroundColor[2],
              borderColor: borderColor[2]
            }
          ]
        };

        setState({ globalStats: Global, chartDataTotal });
      })
      .catch(err => { });
  }, []);

  return <div className="w-100 content p-10">
    <h3 className="mt-0 fs-14">Global Statistics</h3>
    {state.globalStats && <ul className="w-100 d-flex flex-wrap">
      {Object.keys(state.globalStats).map((r: any) => <li key={r}
        style={{ width: '50%', border: '1px solid #4e4e4e' }}
        className="d-flex-col p-10 fs-14">
        <span>{SplitUpper(r)}</span>
        <span>{FormatNum(state.globalStats[r])}</span>
      </li>)}
    </ul>}

    {state.chartDataTotal && <div className="w-100 mt-10">
      <h3 className="mt-0 fs-14">Global Statistics By Continent</h3>
      <Bar
        data={state.chartDataTotal}
        height={300}
        legend={{ labels: { fontColor: "white" } }}
        options={chartOptions}
      />
    </div>}
  </div>
}
