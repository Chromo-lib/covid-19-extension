import React from 'react';
import Spinner from '../../components/Spinner';
import { FormatNum } from '../../utils/FormatNum';

export default function CountryInfos({ clickedCountry }) {
  if (clickedCountry) {
    return <div className="w-100">
      <ul className="w-100 d-flex col-4 fs-10 br7 mb-10" style={{ flexWrap: 'wrap' }}>
        <li className="d-flex-col br7"><span>country</span><p>{clickedCountry.country}</p></li>
        <li className="d-flex-col br7"><span>continent</span><p>{clickedCountry.continent}</p></li>
        <li className="d-flex-col br7"><span>population</span><p>{FormatNum(clickedCountry.population)}</p></li>
      </ul>

      <ul className="w-100 d-flex col-4 fs-10 br7 mb-10" style={{ flexWrap: 'wrap' }}>
        <li className="d-flex-col br7"><span>cases</span><p>{FormatNum(clickedCountry.cases)}</p></li>
        <li className="d-flex-col br7"><span>active</span><p>{FormatNum(clickedCountry.active)}</p></li>
        <li className="d-flex-col border-bottom-red br7"><span>critical</span><p>{FormatNum(clickedCountry.critical)}</p></li>
        <li className="d-flex-col border-bottom-red br7"><span>deaths</span><p>{FormatNum(clickedCountry.deaths)}</p></li>
      </ul>

      <ul className="w-100 d-flex col-4 fs-10 br7 mb-10" style={{ flexWrap: 'wrap' }}>
        <li className="d-flex-col border-bottom-green br7"><span>recovered</span><p>{FormatNum(clickedCountry.recovered)}</p></li>
        <li className="d-flex-col border-bottom-red br7"><span>today deaths</span><p>{FormatNum(clickedCountry.todayDeaths)}</p></li>
        <li className="d-flex-col br7"><span>today cases</span><p>{FormatNum(clickedCountry.todayCases)}</p></li>
        <li className="d-flex-col border-bottom-green br7"><span>today recovered</span><p>{FormatNum(clickedCountry.todayRecovered)}</p></li>
      </ul>
    </div>
  }
  else {
    <Spinner />
  }
}