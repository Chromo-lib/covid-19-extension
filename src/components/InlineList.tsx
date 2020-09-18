import React, { forwardRef, useContext, useRef, useState } from 'react';
import { FormatNum } from '../utils/FormatNum';
import './InlineList.css';
import { GlobalContext } from '../state/GlobalState';
import LocalDefaultCountries from '../utils/LocalDefaultCountries';

const ContextMenu = forwardRef(({ clickedCountry }: any, ref: any) => {
  const { globalState, setGloablState }: any = useContext(GlobalContext);
  const { tabName, allCountries, defaultCountries } = globalState;

  const onAction = (actionType: string) => {
    const { country } = clickedCountry;
    switch (actionType) {
      case 'add':
        let isN = defaultCountries.some((cnt: any) => cnt.country === country);
        if (!isN) {
          let nd = allCountries.find((cnt: any) => cnt.country === country);
          setGloablState({ ...globalState, defaultCountries: [...defaultCountries, nd], currentTabId: 0 });
          LocalDefaultCountries.set(country);
        }
        else {
          window.confirm("Already exists! " + country);
        }
        break;

      case 'remove':
        let c = window.confirm("Are you sure to remove? " + country);
        if (c) {
          let ndd = defaultCountries.filter((cnt: any) => cnt.country !== country);
          setGloablState({ ...globalState, defaultCountries: ndd, currentTabId: 0 });
          LocalDefaultCountries.remove(country);
        }
        break;

      case 'stats':
        setGloablState({ ...globalState, clickedCountry, currentTabId: 3 });
        break;

      default:
        break;
    }
  }

  return <ul className="ctx-menu disp-none" ref={ref}>
    <li onClick={() => { onAction('stats') }}>More Statistics for {clickedCountry.country}</li>
    {tabName === 'world'
      ? <li onClick={() => { onAction('add') }}>add to home</li>
      : <li onClick={() => { onAction('remove') }}>remove from home</li>}
  </ul>
});

export default function InlineList({ children, data }: any) {

  const { globalState, setGloablState }: any = useContext(GlobalContext);
  const [clickedCountry, setClickedCountry]: any = useState('');
  const ctxMenuRef: any = useRef(null);

  const onClickCountry = (cdCounttry: string) => {
    setGloablState({ ...globalState, clickedCountry: cdCounttry, currentTabId: 3 })
  }

  const onContextMenu = (event: any, cdCounttry: any) => {
    event.preventDefault();
    if (ctxMenuRef && ctxMenuRef.current) {
      setClickedCountry(cdCounttry);
      ctxMenuRef.current.style.top = event.pageY + "px";
      ctxMenuRef.current.style.left = event.pageX + "px";
      ctxMenuRef.current.classList.toggle("disp-none");
    }

    
    let clickAway = () => {
      if (ctxMenuRef && ctxMenuRef.current) {
        ctxMenuRef.current.classList.add("disp-none");
      }
      window.removeEventListener("click", clickAway);
    }

    window.addEventListener("click", clickAway);
  }

  return (<div className="w-100">
    <ul className="inline-list">

      {data.map((details: any, i: number) => <li key={'c' + i}
        onClick={() => { onClickCountry(details) }} title={details.country}
        onContextMenu={(e) => { onContextMenu(e, details) }}>

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

    <ContextMenu ref={ctxMenuRef} clickedCountry={clickedCountry} />
    {children}
  </div>);
}