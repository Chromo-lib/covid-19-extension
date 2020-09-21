import React from 'react';
import logoImg from '../assets/icon.png';

export default function TabAbout() {
  return (<div className="w-100 content p-20">

    <img src={logoImg} alt="logo" className="mx-auto mb-10" />

    <h3 className="m-0"><a href="https://github.com/Chromo-lib/covid-19-extension" className="txt-white">CovidNow</a></h3>
    <small>v1.0.6</small>

    <p className="mb-0">CovidNow is built by <a href="https://github.com/haikelfazzani" className="txt-yellow">Haikel Fazzani</a> on open-source and wouldn’t exist without it.</p>

    <small className="txt-green font-bold mt-10">Credit to</small>
    <p className="m-0 fs-12">covid19api</p>
    <p className="mt-0">corona.lmao</p>

    <small className="txt-yellow">License under MIT</small>
  </div>);
}