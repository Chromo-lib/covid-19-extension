import React, { Suspense } from 'react';
import TabHome from '../tabs/TabHome';
const TabGlobal = React.lazy(() => import('../tabs/TabGlobal'));
const TabWorld = React.lazy(() => import('../tabs/TabWorld'));
const TabStatisticsCountry = React.lazy(() => import('../tabs/TabStatisticsCountry'));
const TabAbout = React.lazy(() => import('../tabs/TabAbout'));

export default function SwitchTab({ currentTabId, allCountries, defaultCountries }: any) {
  switch (currentTabId) {
    case 1:
      return <Suspense fallback={<div>Loading...</div>}>
        <TabWorld allCountries={allCountries} tabName="world" />
      </Suspense>

    case 2:
      return <Suspense fallback={<div>Loading...</div>}><TabGlobal /></Suspense>

    case 3:
      return <Suspense fallback={<div>Loading...</div>}><TabAbout /></Suspense>

    case 100:
      return <Suspense fallback={<div>Loading...</div>}><TabStatisticsCountry /></Suspense>

    default:
      return <TabHome defaultCountries={defaultCountries} tabName="home" />
  }
}