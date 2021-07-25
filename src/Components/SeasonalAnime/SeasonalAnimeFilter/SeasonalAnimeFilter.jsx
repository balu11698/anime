import React, { useCallback } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './SeasonalAnimeFilter.module.scss'
import { useSpring,animated,config } from 'react-spring';

const SeasonalAnimeFilter = ({ season, setSeason, seasonArchive, year, setYear }) => {
  const [seasonsOfYearArchive, setSeasonsOfYearArchive] = useState([])
  const [yearsArchive, setYearsArchive] = useState([])
  const seasons = ["winter", "summer", "fall"]
  // console.log(season,"from seasonal ANime")
  useEffect(() => {
    // console.log(year, "seasonArchive")
    let seasons = seasonArchive.filter(archive => {
      return archive.year == year
    })[0]?.seasons;
    if (seasons) if (seasons.toString() != seasonsOfYearArchive.toString()) setSeasonsOfYearArchive(seasons);
  
    // console.log("seasonArchive")
  }, [season, year, seasonArchive]);

  useEffect(() => {
    let years = seasonArchive.map(archive => {
      return archive.year;
    })
    if (years) setYearsArchive(years);
  }, [seasonArchive]);

  useEffect(() => {
    setSeasonHandler();
  }, [seasonsOfYearArchive]);

  const seasonHandler = (e) => {
    // console.log(e.target.value,"selected");
    setSeason.setSeason(e.target.value);
  }

  const yearHandler = (e) => {
    setYear.setYear(e.target.value);
  }

  const setSeasonHandler = () => {
    // console.log(seasonsOfYearArchive, "season")
    // console.log(seasons)
    // console.log(seasonsOfYearArchive, "seaonsOfyearout");
    if (seasonsOfYearArchive.length != 0 && !seasonsOfYearArchive.includes(season[0].toUpperCase() + season.slice(1))) {
      // console.log(seasonsOfYearArchive, "seaonsOfyearin");
      setSeason.setSeason("winter");
      // console.log("inside")
    }
    // console.log("outside1")
  }

  const spring = useSpring({
    from: { opacity: 0, transform: "translate3d(-50px, 0px, 0px)" },
    to: { opacity: 1, transform: "translate3d(0px, 0px, 0px)" },
    config: config.wobbly,

  })

  return (
    <div style={spring} className={styles.filtersWrapper}>
      <select id="seasons" className={styles.seasonFilter} value={season} onChange={seasonHandler}>
        {seasonsOfYearArchive.length!=0 && seasonsOfYearArchive.map(season => {
          return <option key={season} value={season.toLowerCase()}>{season}</option>
        })}
        {seasonsOfYearArchive.length==0 && <option value="...">Loading...</option>}
      </select>
      <select id="year" className={styles.yearFilter} value={year} onChange={yearHandler} >
        {yearsArchive?.map(year => {
          return <option key={year} value={year}>{year}</option>
        })
        }
      </select>
    </div>
  );
}

export default SeasonalAnimeFilter;