import React, { useContext, useState } from 'react';
import { GlobalContext } from '../state/GlobalState';

export default function Footer() {

  const { globalState }: any = useContext(GlobalContext);
  const [theme, setTheme] = useState(globalState.setTheme());

  const onSwitchTheme = () => {
    let nTheme = globalState.setTheme();
    setTheme(nTheme)
  }

  return (<footer className="w-100 d-flex">
    <p className="m-0">Created with coffee by <a href="https://github.com/haikelfazzani" className="txt-yellow">Haikel Fazzani</a></p>
    <div onClick={onSwitchTheme}>
      {theme === 'light'
        ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>

        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>}
    </div>
  </footer>);
}