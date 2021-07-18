import React, { useState, useEffect } from 'react';
import './App.scss';
import Home from './Components/Home/Home'
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import { navigationTitles } from './Constants/Constants'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(()=>{
    const theme = localStorage.getItem("theme")
    if(theme == "light"){
      setIsDarkMode(false)
    }
    else{
      setIsDarkMode(true)
    }
    console.log(theme)
  },[])
  console.log(isDarkMode,"darkmodee")
  return (
    <div id="theme" className="containerWrapper" data-theme={isDarkMode ? "dark" : "light"}>
      <Router>
        <Nav {...{isDarkMode,DarkMode:{setIsDarkMode}}} />
        <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
            {navigationTitles.map(title => {
              return <Route key={title.name} path={title.path} exact component={title.component} />
            })}
          </Switch>
        </div>
      </Router>
    </div>
  );

}

export default App;
