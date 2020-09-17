import React from 'react';
import {FormatNum} from '../utils/FormatNum';
import './InlineList.css';

const HeaderInlineList = () => (
  <ul className="inline-list overflow-hidden">
    <li className="txt-bleu fs-10">
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

export default function InlineList({ data, onCtxMenu, tabName = 'home' }: any) {
  return (<div className="w-100 content">

    <HeaderInlineList />

    <ul className="inline-list">

      {data.map((details: any, i: number) => <li key={'c' + i}>
        <div className="select-country">
          {tabName === 'world'
            ? <button title="Add to home tab" onClick={() => { onCtxMenu('add', details.country) }} className="fadeIn"><svg xmlns="http://www.w3.org/2000/svg" width="22" fill="none" viewBox="0 0 24 24" stroke="white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg></button>
            : <button title="Remove from home tab" onClick={() => { onCtxMenu('remove', details.country) }} className="fadeIn"><svg xmlns="http://www.w3.org/2000/svg" width="22" fill="none" viewBox="0 0 24 24" stroke="#ff5151">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg></button>}

          <img src={details.countryInfo.flag} alt={details.country} height="35" />
        </div>

        <div className="fs-14" title={details.country}>
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