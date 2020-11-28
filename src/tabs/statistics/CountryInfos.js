import React from 'react';
import Spinner from '../../components/Spinner';
import { FormatNum } from '../../utils/FormatNum';

export default function CountryInfos ({ clickedCountry }) {
  if (clickedCountry) {
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
  else {
    <Spinner />
  }
}