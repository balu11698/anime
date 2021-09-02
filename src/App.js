import React, { useState, useEffect } from 'react';
import styles from './App.module.scss';
import Home from './Components/Home/Home'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import { RoutePaths } from './Constants/Constants'
import AnimeSearch from './Components/Search/AnimeSearch/AnimeSearch';


function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    const theme = localStorage.getItem("theme")
    if (theme == "light") {
      setIsDarkMode(false)
    }
    else {
      setIsDarkMode(true)
    }
    console.log(theme)
  }, [])
  return (
    <div id="theme" className={styles.containerWrapper} data-theme={isDarkMode ? "dark" : "light"}>
      <Router>
        <Nav {...{ isDarkMode, DarkMode: { setIsDarkMode } }} />
        <div className={styles.container}>
          <Switch>
            <Route path="/" exact component={Home} />
            {RoutePaths.map(title => {
              return <Route key={title.name} path={title.path} component={title.component} />
            })}
            {/* {dynamicRoutePaths.map(title => {
              return <Route key={title.name} path={title.path}  component={title.component} />
            })} */}
            <Route path="/search/:id" component={AnimeSearch} />
          </Switch>
        </div>
      </Router>
    </div>
  );

}

export default App;
