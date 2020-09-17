import React from 'react';
import InlineList from './InlineList';

export default function TabHome({ defaultCountries, onCtxMenu }: any) {
  return <>
    <header>
      <h3 className="m-0">covid 19 tracker</h3>
      <p className="mt-0">{new Date().toString().slice(0, 15)}</p>
      <p className="m-0">WE HOPE YOU ARE STAYING HEALTHY AND SAFE.</p>
    </header>

    <InlineList
      data={defaultCountries}
      onCtxMenu={onCtxMenu}
      tabName="home"
    />
  </>
}