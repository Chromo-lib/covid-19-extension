import React from 'react';
import InlineList from './InlineList';

export default function TabHome ({ defaultCountries }: any) {
  return <>
    <header>
      <h3 className="m-0">{defaultCountries[0].country}</h3>
      <p className="mt-0">{new Date().toString().slice(0, 15)}</p>
      <p className="m-0">WE HOPE YOU ARE STAYING HEALTHY AND SAFE.</p>
    </header>
    <InlineList data={defaultCountries} />
  </>
}