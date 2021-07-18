import React from 'react';
import { Toolbar, AppBar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { navigationTitles } from '../../Constants/Constants';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import './Nav.scss'

const Nav = ({ isDarkMode, DarkMode }) => {
  const darkModeHandler = () => {
    isDarkMode ? DarkMode.setIsDarkMode(false) : DarkMode.setIsDarkMode(true)
  }
  return (
    <AppBar style={{ position: "sticky" }}>
      <Toolbar>
        <div className="navBar">
          <div className="header">
            Anime Kun
          </div>
          <div className="navigation">
            {navigationTitles.map(title => {
              return <Link className="navigationLinks" to={title.path} key={title.name}>{title.name}</Link>;
            })}
            <Brightness4Icon onClick={darkModeHandler} />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Nav;