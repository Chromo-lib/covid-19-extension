import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Spinner from '../../components/Spinner';
import { backgroundColor, borderColor } from '../../utils/ChartColors';
import EnglishMonths from '../../utils/EnglishMonths';
ChartJS.register(...registerables);

const chartOptions = {
  scales: {
    y: {
      ticks: {
        display: true,
        beginAtZero: true,
        fontColor: 'white'
      },
    },
    x: {
      ticks: {
        display: true,
        fontColor: 'white'
      },
      gridLines: {
        color: 'white'
      }
    }
  }
}

export default function CountryChart({ countryStats, selectedMonth }) {

  const [state, setState] = useState(null);

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
        labels: Object.keys(countryStats).map((r) => EnglishMonths[r]),
        datasets: [{
          label: 'Confirmed ',
          data: Object.values(countryStats).map((r) => r.Confirmed),
          backgroundColor: backgroundColor[1],
          borderColor: borderColor[1]
        },
        {
          label: 'Deaths ',
          data: Object.values(countryStats).map((r) => r.Deaths),
          backgroundColor: backgroundColor[0],
          borderColor: borderColor[0]
        },
        {
          label: 'Active ',
          data: Object.values(countryStats).map((r) => r.Active),
          backgroundColor: backgroundColor[2],
          borderColor: borderColor[2]
        },
        {
          label: 'Recovered ',
          data: Object.values(countryStats).map((r) => r.Recovered),
          backgroundColor: backgroundColor[3],
          borderColor: borderColor[3]
        }]
      })
    }
  }, [selectedMonth]);

  if (state) {
    return <Bar
      data={state}
      height={270}
      legend={{ labels: { fontColor: "white" } }}
      options={chartOptions}
    />
  }
  else {
    return <Spinner />
  }
}