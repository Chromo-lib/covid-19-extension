import React, { createContext, useState } from 'react';

let GlobalContext: any = createContext(null);

const initState = {
  currentTabId: 0,
  clickedCountry: null,
  allCountries: [],
  defaultCountries: []
};

function GlobalStateProvider({ children }: any) {
  const [globalState, setGloablState]: any = useState(initState);
  return (<GlobalContext.Provider value={{ globalState, setGloablState }}>
    {children}
  </GlobalContext.Provider>);
}

export { GlobalStateProvider, GlobalContext };