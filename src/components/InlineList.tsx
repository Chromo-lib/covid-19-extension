import React from 'react';
import FormatNum from '../utils/FormatNum';
import './InlineList.css';

const HeaderInlineList = () => (
  <ul className="inline-list">
    <li className="txt-bleu">
      <div>Country</div>

      <div>
        <span>TODAY / ALL</span>
        <span>CASES</span>
      </div>

      <div>
        <span>TODAY / ALL</span>
        <span>DEATHS</span>
      </div>

      <div>
        <span>TODAY / ALL</span>
        <span>RECOVERED</span>
      </div>

      <div>
        <span>critical / </span>
        <span> active</span>
      </div>
    </li>
  </ul>
)

export default function InlineList({ data, onSelectCountry }: any) {
  return (<div className="w-100 content">

    <HeaderInlineList />

    <ul className="inline-list">

      {data.map((details: any, i: number) => <li key={'c' + i} onClick={() => { onSelectCountry(details) }}>
        <div title={details.country} className="select-country">
          <img src={details.countryInfo.flag} alt={details.country} height="35" />
          <button type="button">+</button>
        </div>

        <div className="fs-14">
          <span className="txt-red">+{FormatNum(details.todayCases)}</span>
          <span>{FormatNum(details.cases)}</span>
        </div>

        <div className="fs-14">
          <span className="txt-red">+{FormatNum(details.todayDeaths)}</span>
          <span>{FormatNum(details.deaths)}</span>
        </div>

        <div className="fs-14">
          <span className="txt-green">+{FormatNum(details.todayRecovered)}</span>
          <span>{FormatNum(details.recovered)}</span>
        </div>

        <div className="fs-14">
          <span className="txt-red">{FormatNum(details.critical)}</span>
          <span>{FormatNum(details.active)}</span>
        </div>
      </li>)}
    </ul>
  </div>);
}