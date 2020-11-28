import React, { Suspense, lazy,useState, useEffect } from 'react';
import { backgroundColor, borderColor } from '../../utils/ChartColors';
import Spinner from '../../components/Spinner';
import CovidService from '../../CovidService';

const InfosGlobal = lazy(() => import('./InfosGlobal'));
const ChartGlobal = lazy(() => import('./ChartGlobal'));

export default function TabGlobal () {

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

    <Suspense fallback={<Spinner />}>
      <InfosGlobal globalStats={state.globalStats} />
      <ChartGlobal chartDataTotal={state.chartDataTotal} />
    </Suspense>
  </div>
}
