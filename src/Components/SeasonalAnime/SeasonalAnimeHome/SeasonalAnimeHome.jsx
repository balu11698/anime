import React, { useEffect, useCallback, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import StarIcon from '@material-ui/icons/Star';
import { fetchSeasonalAnime } from '../../../ApiService/api';
import  styles from './SeasonalAnimeHome.module.scss'

const SeasonalAnimeDetailsHome = () => {
  console.log(styles,"classes")
  const [seasonalAnimeData, setSeasonalAnimeData] = useState([])
  const [season, setSeason] = useState("summer");
  const [year, setYear] = useState(2021)
  const [isLoading, setIsLoading] = useState(false)
  const getSeasonalAnimeData = useCallback(async () => {
    const data = await fetchSeasonalAnime(season, year);
    setSeasonalAnimeData(data);
    setIsLoading(false)
  }, [])
  useEffect(() => {
    setIsLoading(true)
    getSeasonalAnimeData();
  }, [])

  return (
    <div className={styles.seasonalAnime}>
      {
        (isLoading ? <Skeleton animation="wave" variant="rect" height={250} width="100%" />
          :
          seasonalAnimeData?.anime?.slice(0, 20).map(anime => {
            return (
              <div className={styles.anime} key={anime.mal_id}>
                <div className={styles.animeDetailsWrapper}>
                  <div className={styles.animeTitle}>{anime.title}</div>
                  <div className={styles.animeDetails}>
                    <div className={styles.animeEpisodes}>{anime.episodes ? `Episodes : ${anime.episodes}` : null}</div>
                    <div className={styles.animeScore}><StarIcon className={styles.ratingStar} />{anime.score}</div>
                  </div>
                </div>
                <div><img className={styles.animeImage} src={anime.image_url} /></div>
              </div>
            );
          })
        )
      }
    </div>
  );
}

export default SeasonalAnimeDetailsHome;