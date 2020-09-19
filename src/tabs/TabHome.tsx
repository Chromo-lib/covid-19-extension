import React from 'react';
import HeaderInlineList from '../components/HeaderInlineList';
import InlineList from '../components/InlineList';

function TabHome({ defaultCountries }: any) {
  return <div className="w-100 content">
    <header>
      <h3 className="m-0">covid 19 tracker</h3>
      <p className="mt-0">{new Date().toString().slice(0, 15)}</p>
      <p className="m-0">WE HOPE YOU ARE STAYING HEALTHY AND SAFE.</p>
    </header>

    <HeaderInlineList />

    <div className="w-100 mxw-4 mb-10">
      <InlineList data={defaultCountries} />
    </div>
  </div>
}

export default React.memo(TabHome);
