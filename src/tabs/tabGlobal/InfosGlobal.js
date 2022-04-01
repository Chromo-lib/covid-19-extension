import React from 'react';
import { FormatNum } from '../../utils/FormatNum';
import SplitUpper from '../../utils/SplitUpper';

export default function InfosGlobal ({ globalStats }) {
  return <>
    {globalStats && <div className="w-100 mt-10 mb-10 br7">
      <ul className="w-100 d-flex flex-wrap br7">
        {Object.keys(globalStats).map((r) => {
          if (r !== "Date") {
            return <li key={r}
              style={{ width: '50%', border: '1px solid #ddd' }}
              className="d-flex-col p-10 fs-14">
              <small className='txt-muted'>{SplitUpper(r)}</small>
              <p className='mt-10'>{FormatNum(globalStats[r])}</p>
            </li>
          }
        })}
      </ul>
    </div>}
  </>
}