import React, { createContext, useState } from 'react';

let GlobalContext = createContext(null);

const initState = {
  currentTabId: 0,
  clickedCountry: null, // country object
  allCountries: [],
  defaultCountries: [],
  tabName: 'home'
};

function GlobalStateProvider({ children }) {
  const [globalState, setGloablState] = useState(initState);
  return (<GlobalContext.Provider value={{ globalState, setGloablState }}>
    {children}
  </GlobalContext.Provider>);
}

export { GlobalStateProvider, GlobalContext };