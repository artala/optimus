import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Routes,
  Route
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import React,{ useState } from "react";
import { ThemeContext } from './themeContext';
import OptimonLogo from './assets/optimon_logo.png'

function App() {

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
        setTheme('light');
    }
  };

  const value = {theme, setTheme, toggleTheme};

  

    return (
      <ThemeContext.Provider value={value}>
        <div className={`fullHeightVh ${theme} mainClass`}>
          <nav className={`navbar navbar-expand navbar-dark navigation ${theme === 'dark' ? 'blackBackground' : 'lightBlueBackground'}`}>
            <div className="navigationSection">
              <img className="headerImage" src={OptimonLogo} alt="Optimon Logo"></img>
              <a href="/optimon" className="navbar-brand headerLink">
                <p className={`titleHeader ${theme} ${theme === 'dark' ? 'blackBackground' : 'lightBlueBackground'}`}>OPTIMON+</p>
              </a>
            </div>
           
          </nav>
          <div className="autoHeight">
            <Routes>
              <Route exact path="/endpoints" element={<Dashboard />} />
              <Route exact path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </ThemeContext.Provider>
    );
}

export default App;
