import React, { useEffect, useCallback, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import StarIcon from '@material-ui/icons/Star';
import { fetchSeasonalAnime, fetchSeasonsArchive } from '../../../ApiService/api';
import styles from './SeasonalAnimeMain.module.scss'
import SeasonalAnimeFilter from '../SeasonalAnimeFilter/SeasonalAnimeFilter';

const SeasonalAnimeDetailsMain = () => {
  const [seasonalAnimeData, setSeasonalAnimeData] = useState([])
  const [seasonArchive, setSeasonArchive] = useState([])
  const [season, setSeason] = useState("summer");
  const [year, setYear] = useState(2021)
  const [isLoading, setIsLoading] = useState(false)
  const getSeasonalAnimeData = async () => {
    console.log(season, "inside api")
    const data = await fetchSeasonalAnime(season, year);
    setSeasonalAnimeData(data);
    setIsLoading(false)
  }
  useEffect(() => {
    setIsLoading(true)
    getSeasonalAnimeData();
  }, [season, year])
  useEffect(async () => {
    const data = await fetchSeasonsArchive();
    setSeasonArchive(data.archive);
    console.log("seasonArchive api")
  }, [])
  // console.log(seasonalAnimeData)
  return (
    // <div className="seasonalAnimeDetailsWrapper">
    //  <div className="seasonalAnimeDetails">
    <React.Fragment>
      <SeasonalAnimeFilter {...{ season, setSeason: { setSeason }, seasonArchive, year, setYear: { setYear } }} />
      <div className={styles.seasonalAnime}>
        {
          isLoading ? <Skeleton animation="wave" variant="rect" height={250} width="100%" />
            :
            seasonalAnimeData?.anime?.map(anime => {
              return (
                <div className={styles.anime} key={anime.mal_id}>
                  <div className={styles.animeDetailsWrapper}>
                    <div className={styles.animeTitle}>{anime.title}</div>
                    <div className={styles.animeDetails}>
                      {anime.episodes ? <div className={styles.animeEpisodes}> Episodes : ${anime.episodes} </div> : null}
                      <div className={styles.animeScore}><StarIcon className={styles.ratingStar} />{anime.score}</div>
                    </div>
                  </div>
                  <div><img className={styles.animeImage} src={anime.image_url} /></div>
                </div>
              );
            })
        }
      </div>
    </React.Fragment>
    // </div>
    // </div>
  );
}

export default SeasonalAnimeDetailsMain;