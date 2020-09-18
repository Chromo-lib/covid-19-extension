import React, { useContext } from 'react';
import { FormatNum } from '../utils/FormatNum';
import './InlineList.css';
import { GlobalContext } from '../state/GlobalState';

export default function InlineList({ children, data }: any) {

  const { globalState, setGloablState }: any = useContext(GlobalContext);

  const onClickCountry = (clickedCountry: string) => {
    setGloablState({ ...globalState, clickedCountry, currentTabId: 3 })
  }

  return (<div className="w-100">
    <ul className="inline-list hover">

      {data.map((details: any, i: number) => <li key={'c' + i}
        onClick={() => { onClickCountry(details) }} title={details.country}>

        <div>
          <img src={details.countryInfo.flag} alt={details.country} height="35" />
        </div>

        <div>
          <span className="txt-red">+{FormatNum(details.todayCases)}</span>
          <span>{FormatNum(details.cases)}</span>
        </div>

        <div>
          <span className="txt-red">+{FormatNum(details.todayDeaths)}</span>
          <span>{FormatNum(details.deaths)}</span>
        </div>

        <div>
          <span className="txt-green">+{FormatNum(details.todayRecovered)}</span>
          <span>{FormatNum(details.recovered)}</span>
        </div>

        <div>
          <span className="txt-red">{FormatNum(details.critical)}</span>
          <span>{FormatNum(details.active)}</span>
        </div>

      </li>)}
    </ul>

    {children}
  </div>);
}