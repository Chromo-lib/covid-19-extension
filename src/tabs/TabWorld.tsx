import React, { useState } from 'react';
import HeaderInlineList from '../components/HeaderInlineList';
import InlineList from '../components/InlineList';

function TabWorld({ allCountries }: any) {
  const [slicedCountries, setSlicedCountries] = useState(allCountries.slice(0, 20));
  const [slicePer, setSlicePer] = useState(20);

  const [countryName, setCountryName] = useState('');
  const [sortVal, setSortVal] = useState('');

  const onLoadMore = () => {
    setSlicePer(slicePer + 20);
    setSlicedCountries(allCountries.slice(0, slicePer + 20));
  }

  const onSearch = (e: any) => {
    let val = e.target.value.toLowerCase();
    setCountryName(val);

    let nCountries = allCountries.filter((a: any) => a.country.toLowerCase().includes(val));

    if (nCountries && nCountries.length > 0) {
      setSlicedCountries(nCountries.slice(0, slicePer + 20));
    }
    else {
      setSlicedCountries(allCountries.slice(0, slicePer + 20));
    }
  }

  const onSortBy = (e: any) => {
    let val = e.target.value;
    setSortVal(val);
    let nCountries = allCountries.sort((i: any, j: any) => j[val] - i[val]).slice(0, slicePer);
    setSlicedCountries(nCountries);
  }

  return <div className="w-100 content">
    <div className="w-100 d-flex col-3 p-10">
      <input type="search"
        name="country"
        onChange={onSearch}
        value={countryName}
        placeholder="Search by country name.."
      />

<div className="bg-white">
<svg xmlns="http://www.w3.org/2000/svg" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
</svg>
</div>

      <select name="sort" onChange={onSortBy} value={sortVal}>
        <option value="cases">Sort by cases</option>
        <option value="deaths">Sort by deaths</option>
        <option value="recovered">Sort by recovered</option>
        <option value="todayCases">Sort by today cases</option>
        <option value="todayDeaths">Sort by today deaths</option>
        <option value="todayRecovered">Sort by today recovered</option>
      </select>

    </div>
    <HeaderInlineList />

    <InlineList data={slicedCountries}>
      <div className="w-100 p-10">
        <button type="button" onClick={onLoadMore}>Load more</button>
      </div>
    </InlineList>
  </div>
}

export default TabWorld;
