import React, { createContext, useState } from 'react';

let GlobalContext: any = createContext(null);

let localTheme = localStorage.getItem('theme');
const htmlTag = document.getElementsByTagName("html")[0];
if (localTheme) htmlTag.dataset.theme = localTheme;

const initState = {
  currentTabId: 0,
  clickedCountry: null, // country object
  allCountries: [],
  defaultCountries: [],
  tabName: 'home',
  setTheme: () => {
    let nTheme = 'light';
    localTheme = localStorage.getItem('theme');
    if (localTheme) {
      nTheme = localTheme === 'light' ? 'dark' : 'light';
    }
    htmlTag.dataset.theme = nTheme;
    localStorage.setItem('theme', nTheme);
    return nTheme;
  }
};

function GlobalStateProvider({ children }: any) {
  const [globalState, setGloablState]: any = useState(initState);
  return (<GlobalContext.Provider value={{ globalState, setGloablState }}>
    {children}
  </GlobalContext.Provider>);
}

export { GlobalStateProvider, GlobalContext };