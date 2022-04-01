import React from 'react';
import TabHome from './tabs/TabHome';
import TabGlobal from './tabs/tabGlobal/TabGlobal';
import TabWorld from './tabs/TabWorld';
import TabStatisticsCountry from './tabs/statistics/TabStatisticsCountry';

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