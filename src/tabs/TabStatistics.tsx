import React, { useState, useEffect } from 'react';
import { FormatNum } from '../utils/FormatNum';
import SplitUpper from '../utils/SplitUpper';

export default function TabStatistics() {

  const [state, setState]: any = useState();

  useEffect(() => {
    fetch('https://api.covid19api.com/summary')
      .then(r => r.json())
      .then(resp => {
        setState(resp);
      })
      .catch(err => { });
  }, []);

  return <div className="w-100 content p-10">
    <h3 className="mt-0">Global Statistics</h3>
    {state && <ul className="w-100 d-flex flex-wrap">
      {Object.keys(state.Global).map((r: any) => <li key={r}
        style={{ width: '50%', border: '1px solid #4e4e4e' }}
        className="d-flex-col p-10 fs-14">
        <span>{SplitUpper(r)}</span>
        <span>{FormatNum(state.Global[r])}</span>
      </li>)}
    </ul>}
  </div>
}
