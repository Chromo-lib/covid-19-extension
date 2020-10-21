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

  const [state, setState] = useState({
    globalStats: null, chartDataTotal: null, allCountries: null
  });

  useEffect(() => {
    Promise.all([CovidService.summury(), CovidService.statsByContents(), CovidService.fetchAllCountries()])
      .then(([globalStats, continents, allCountries]) => {

        let chartDataTotal = {
          labels: continents.map((c) => c.continent),
          datasets: [
            {
              label: 'Cases',
              data: continents.map((c) => c.cases),
              backgroundColor: backgroundColor[1],
              borderColor: borderColor[1]
            },
            {
              label: 'Recovered',
              data: continents.map((c) => c.recovered),
              backgroundColor: backgroundColor[3],
              borderColor: borderColor[3]
            },
            {
              label: 'Deaths',
              data: continents.map((c) => c.deaths),
              backgroundColor: backgroundColor[0],
              borderColor: borderColor[0]
            },
            {
              label: 'Active',
              data: continents.map((c) => c.active),
              backgroundColor: backgroundColor[2],
              borderColor: borderColor[2]
            }
          ]
        };

        setState({ globalStats, chartDataTotal, allCountries });

        let r = allCountries.reduce((a, c) => {
          if (c.countryInfo && c.countryInfo["iso2"]) {
            a[c.countryInfo["iso2"]] = c;
          }
          return a
        }, {});

        new window.svgMap({
          targetElementID: 'svgMap',
          data: {
            data: {
              cases: {
                name: 'cases',
                format: '{0}',
                thousandSeparator: ',',
                thresholdMax: 50000,
                thresholdMin: 1000
              },
              active: {
                name: 'active',
                format: '{0}'
              },
              critical: {
                name: 'critical',
                format: '{0}'
              },
              deaths: {
                name: 'deaths',
                format: '{0}'
              },
              recovered: {
                name: 'recovered',
                format: '{0}'
              },
              todayCases: {
                name: 'new cases',
                format: '{0}'
              },
              todayDeaths: {
                name: 'new deaths',
                format: '{0}'
              },
              todayRecovered: {
                name: 'new recovered',
                format: '{0}'
              }
            },
            applyData: 'cases',
            values: r
          }
        });
      })
      .catch(err => { });
  }, []);

  return <div className="w-100 content p-10">

    <div id="svgMap" className={"w-100 " + (state.allCountries ? "" : "disp-none")}></div>

    {state.globalStats && <div className="w-100 mt-10">
      <ul className="w-100 d-flex flex-wrap">
        {Object.keys(state.globalStats).map((r) => <li key={r}
          style={{ width: '50%', border: '1px solid #4e4e4e' }}
          className="d-flex-col p-10 fs-14">
          <span>{SplitUpper(r)}</span>
          <span>{FormatNum(state.globalStats[r])}</span>
        </li>)}
      </ul>
    </div>}

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
