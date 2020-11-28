import React from 'react';
import { Bar } from 'react-chartjs-2';

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

export default function ChartGlobal ({ chartDataTotal }) {
  return <>
    {chartDataTotal && <div className="w-100 mt-10">
      <h3 className="mt-0 fs-14">Global Statistics By Continent</h3>
      <Bar
        data={chartDataTotal}
        height={300}
        legend={{ labels: { fontColor: "white" } }}
        options={chartOptions}
      />
    </div>}
  </>
}