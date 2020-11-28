import React from 'react';
import { FormatNum } from '../../utils/FormatNum';
import SplitUpper from '../../utils/SplitUpper';

export default function InfosGlobal ({ globalStats }) {
  return <>
    {globalStats && <div className="w-100 mt-10">
      <ul className="w-100 d-flex flex-wrap">
        {Object.keys(globalStats).map((r) => <li key={r}
          style={{ width: '50%', border: '1px solid #4e4e4e' }}
          className="d-flex-col p-10 fs-14">
          <span>{SplitUpper(r)}</span>
          <span>{FormatNum(globalStats[r])}</span>
        </li>)}
      </ul>
    </div>}
  </>
}