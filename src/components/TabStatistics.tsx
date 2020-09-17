import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';
import { FormatNum } from '../utils/FormatNum';
import SplitUpper from '../utils/SplitUpper';

export default function TabStatistics() {

  const [state, setState]: any = useState();

  useEffect(() => {
    fetch('https://api.covid19api.com/summary')
      .then(r => r.json())
      .then(resp => {
        setState(resp);
        var ctxGlobal: any = document.getElementById('globalChart');
        new Chart(ctxGlobal, {
          type: 'bar',
          data: {
            labels: Object.keys(resp.Global).map((r: any) => SplitUpper(r)),
            datasets: [{
              label: '# Global Statistics ',
              data: Object.values(resp.Global).map((r: any) => r),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                stacked: true,
                ticks: {
                  beginAtZero: true
                }
              }],
              xAxes: [{ stacked: true }]
            }
          }
        });
      })
      .catch(err => { });
  }, []);

  return <div className="content">
    <h3>Global Statistics</h3>
    {state && <ul className="w-100 d-flex flex-wrap">
      {Object.keys(state.Global).map((r: any) => <li key={r}
        style={{ width: '50%', border: '1px solid #4e4e4e' }}
        className="d-flex-col p-10 fs-14">
        <span>{SplitUpper(r)}</span>
        <span>{FormatNum(state.Global[r])}</span>
      </li>)}
    </ul>}

    <canvas id="globalChart" height="450" style={{margin:'10px 0'}}></canvas>
  </div>
}
