import React from 'react';
import TabHome from './TabHome';
import TabGlobal from './TabGlobal';
import TabWorld from './TabWorld';
import TabStatisticsCountry from './TabStatisticsCountry';

export default function SwitchTab({ currentTabId, allCountries, defaultCountries }) {
  switch (currentTabId) {
    case 1:
      return <TabWorld allCountries={allCountries} tabName="world" />

    case 2:
      return <TabGlobal />

    case 100:
      return <TabStatisticsCountry />

    default:
      return <TabHome defaultCountries={defaultCountries} tabName="home" />
  }
}