import React from 'react';
import HeaderInlineList from '../components/HeaderInlineList';
import InlineList from '../components/InlineList';
import milliToTime from '../utils/milliToTime';

import MedMaskImg from '../assets/medical-mask.svg';
import keepDimg from '../assets/keep-distance.svg';
import handsWashIMG from '../assets/handwash.svg';

function TabHome({ defaultCountries }: any) {
  return <div className="w-100 content">
    <header className="pt-0">
      <div className="w-100 d-flex col-3">
        <div className="d-flex-col p-10 cr-default">
          <img src={MedMaskImg} alt="tips" width="50" height="50" />
          <span className="fs-10">Wear a mask</span>
        </div>        
        <div className="d-flex-col p-10 cr-default">
          <img src={handsWashIMG} alt="tips" width="50" height="50" />
          <span className="fs-10">Clean your hands</span>
        </div>
        <div className="d-flex-col p-10 cr-default">
          <img src={keepDimg} alt="tips" width="50" height="50" />
          <span className="fs-10">Keep a safe distance</span>
        </div>
      </div>

      <p className="w-100 d-flex fs-12">
        <span>Last update | </span>
        <span>{new Date().toString().slice(0, 15)} | </span>
        <span>{milliToTime(defaultCountries[0].updated)}</span>
      </p>
      <p className="m-0 fs-12">WE HOPE YOU ARE STAYING HEALTHY AND SAFE.</p>
    </header>

    <HeaderInlineList />

    <div className="w-100 mxw-4 mb-10">
      <InlineList data={defaultCountries} />
    </div>
  </div>
}

export default React.memo(TabHome);
