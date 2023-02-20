import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Switch,
  Route
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import { MaterialUISwitch } from './components/MaterialUISwitch';
import React,{ useState } from "react";
import { ThemeContext } from './themeContext';

function App() {

  const [theme, setTheme] = useState('light');

  const value = {theme, setTheme};

  const toggleTheme = () => {
      if (theme === 'light') {
        setTheme('dark');
      } else {
          setTheme('light');
      }
    };

    return (
      <ThemeContext.Provider value={value}>
        <div className={`fullHeightVh ${theme} mainClass`}>
          <nav className={`navbar navbar-expand navbar-dark navigation ${theme === 'dark' ? 'blackBackground' : 'lightBlueBackground'}`}>
            <div className="navigationSection">
              <a href="/endpoints" className="navbar-brand ">
                <p className={`navigationText ${theme} ${theme === 'dark' ? 'blackBackground' : 'lightBlueBackground'}`}>OPTIMON+</p>
              </a>
            </div>
            <button className='buttonStyle' onClick={toggleTheme}>
              <MaterialUISwitch sx={{ m: 2 }} defaultChecked={ theme === 'dark'} />
            </button>
          </nav>
          <div className="autoHeight">
            <Switch>
              <Route exact path={["/", "/endpoints"]} component={Dashboard} />
            </Switch>
          </div>
        </div>
      </ThemeContext.Provider>
    );
}

export default App;
