import React, { forwardRef, useContext, useRef, useState } from 'react';
import { FormatNum } from '../utils/FormatNum';
import { GlobalContext } from '../state/GlobalState';
import LocalDefaultCountries from '../utils/LocalDefaultCountries';
import './ListCountries.css';

const ContextMenu = forwardRef(({ clickedCountry }, ref) => {
  const { globalState, setGloablState } = useContext(GlobalContext);
  const { tabName, allCountries, defaultCountries } = globalState;

  const onAction = (actionType) => {
    const { country } = clickedCountry;
    switch (actionType) {
      case 'add':
        let isN = defaultCountries.some((cnt) => cnt.country === country);
        if (!isN) {
          let nd = allCountries.find((cnt) => cnt.country === country);
          setGloablState({ ...globalState, defaultCountries: [...defaultCountries, nd], currentTabId: 0, tabName: 'home' });
          LocalDefaultCountries.add(country);
        }
        else {
          window.confirm("Already exists! " + country);
        }
        break;

      case 'remove':
        let ndd = defaultCountries.filter((cnt) => cnt.country !== country);
        setGloablState({ ...globalState, defaultCountries: ndd, currentTabId: 0, tabName: 'home' });
        LocalDefaultCountries.remove(country);
        break;

      case 'stats':
        setGloablState({ ...globalState, clickedCountry, currentTabId: 100 });
        break;

      default:
        break;
    }
  }

  return <ul className="ctx-menu disp-none" ref={ref}>
    <li onClick={() => { onAction('stats') }}>More Statistics for <span className="txt-yellow">
      {clickedCountry.country}</span>
    </li>
    {tabName === 'world'
      ? <li onClick={() => { onAction('add') }}>add to home</li>
      : <li onClick={() => { onAction('remove') }}>remove from home</li>}
  </ul>
});

export default function ListCountries ({ children, data, noDrag }) {

  const { globalState, setGloablState } = useContext(GlobalContext);
  const [clickedCountry, setClickedCountry] = useState('');
  const ctxMenuRef = useRef(null);
  const [dragState, setDragState] = useState({ isDragIn: false, selectedLi: null, placeholder: null });

  const onClickCountry = (cdCounttry) => {
    setGloablState({ ...globalState, clickedCountry: cdCounttry, currentTabId: 100 })
  }

  const onContextMenu = (event, cdCounttry) => {
    event.preventDefault();
    if (ctxMenuRef && ctxMenuRef.current) {
      setClickedCountry(cdCounttry);
      ctxMenuRef.current.style.top = event.pageY - 10 + "px";
      ctxMenuRef.current.style.left = event.pageX + 15 + "px";
      ctxMenuRef.current.classList.remove("disp-none");
    }


    let clickAway = () => {
      if (ctxMenuRef && ctxMenuRef.current) {
        ctxMenuRef.current.classList.add("disp-none");
      }
      window.removeEventListener("click", clickAway);
    }

    window.addEventListener("click", clickAway);
  }

  const onDragStart = (event) => {
    if (!noDrag) {
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.setData("text", event.currentTarget.dataset.id);
      event.currentTarget.classList.add('bg-light-bleu');
      setDragState({ ...dragState, selectedLi: event.currentTarget });
    }
  }

  const onDragOver = (event) => {
    event.preventDefault();
  }

  const onDrop = (event) => {
    event.preventDefault();
    if (!noDrag) {
      dragState.selectedLi.classList.remove('bg-light-bleu');

      let data = event.dataTransfer.getData("text");
      let placeholder = event.currentTarget.dataset.id;

      let nd = globalState.defaultCountries.slice(0);
      let tmp = nd[placeholder];
      nd[placeholder] = nd[data];
      nd[data] = tmp;

      setGloablState({ ...globalState, defaultCountries: nd });
      LocalDefaultCountries.replace(nd.map((c) => c.country.toLowerCase()));
    }
  }

  return (<div className="w-100">
    <ul className="inline-list">

      {data.map((details, i) => <li key={'c' + i}
        onClick={() => { onClickCountry(details) }}
        title={details.country}
        data-id={i}
        onContextMenu={(e) => { onContextMenu(e, details) }}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        draggable={globalState.tabName === 'home'}>

        <div>
          <img className='br7' src={details.countryInfo.flag} alt={details.country} height="35" />
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