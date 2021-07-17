import React, { useState, useEffect } from 'react';
import { Toolbar, AppBar } from '@material-ui/core';
import SeasonalAnime from '../SeasonalAnime/SeasonalAnime';
import { fetchSeasonalAnime } from '../../ApiService/api';
import styles from './Home.scss';


const Home = () => {
  const [seasonalAnimeData, setSeasonalAnimeData] = useState()
  const [season, setSeason] = useState("summer");
  const [year,setYear] = useState(2021)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSasonalAnime = async () => {
      console.log(isLoading, "before")
      const data = await fetchSeasonalAnime(season,year);
      setSeasonalAnimeData(data);
      setIsLoading(false)
      console.log(data, 'data')
      console.log(isLoading, "after")
    }
    getSasonalAnime();
  }, [])
  console.log(isLoading, "connstructor")
  // console.log(seasonalAnimeData, "data")

  return (

    <div  className={styles.header}>
      <AppBar>
        <Toolbar>
        </Toolbar>
      </AppBar>
      {!isLoading && <SeasonalAnime {...seasonalAnimeData} />}
    </div>
  );
}
export default Home;