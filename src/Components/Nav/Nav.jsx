import React from 'react';
import { Toolbar, AppBar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../../Constants/Constants';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import './Nav.scss'

const Nav = ({ isDarkMode, DarkMode }) => {
  const darkModeHandler = () => {
    isDarkMode ? lightMode() :darkMode()
  }
  const darkMode = () =>{
    DarkMode.setIsDarkMode(true)
    localStorage.setItem("theme","dark")
  }
  const lightMode = () =>{
    DarkMode.setIsDarkMode(false)
    localStorage.setItem("theme","light")
  }
  return (
    <AppBar style={{ position: "sticky" }}>
      <Toolbar>
        <div className="navBar">
          <div className="header">
            <Link className="navigationLinks" to="/">Anime Kun</Link>
          </div>
          <div className="navigation">
            {RoutePaths.map(title => {
              return <Link className="navigationLinks" to={title.path} key={title.name}>{title.name}</Link>;
            })}
            {isDarkMode ? <Brightness5Icon onClick={darkModeHandler} /> : <Brightness4Icon onClick={darkModeHandler} />}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Nav;