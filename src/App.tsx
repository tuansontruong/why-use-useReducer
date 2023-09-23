import { useEffect, useState } from 'react'
import './App.css'
import LoginUseState from './LoginUseState';

function App() {
  const CurrentRoute = useSimpleHashRouter({
    useState: LoginUseState,
    // useReducer: LoginUseReducer,
  });

  return (
    <>
      {!CurrentRoute && (
        <div className='App App-Column'>
          <a href='#useState'>useState</a>
          <br />
          <br />
          <a href='#useReducerTypeScript'>LoginUseReducerTypeScript</a>
        </div>
      )}
      {CurrentRoute && <CurrentRoute />}
    </>
  )
}

export default App


function useLocationHash() {
  const [hash, setHash] = useState(window.location.hash);
  function onHashChange() {
    setHash(window.location.hash);
  }
  useEffect(() => {
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return hash;
}

function useSimpleHashRouter(routes: { [x: string]: any; useState?: any; useReducer?: any; }) {
  const hash = useLocationHash();
  // Exclude '#' when calculating hash.
  const currentRoute = routes[hash.substr(1)];
  if (currentRoute) {
    return currentRoute;
  }
  return null;
}