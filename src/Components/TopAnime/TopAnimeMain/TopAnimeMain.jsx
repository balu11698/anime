import React, { useEffect, useState, useCallback } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import StarIcon from '@material-ui/icons/Star';
import { fetchTopAnime } from '../../../ApiService/api';
import styles from './TopAnimeMain.module.scss';
import TopAnimeFilter from '../TopAnimeFilter/TopAnimeFilter';

const TopAnimeMain = () => {
  const [topAnimeData, setTopAnimeData] = useState()
  const [isLoading, setIsloading] = useState(false)
  const [type, setType] = useState("anime")
  const [subtype, setSubtype] = useState("airing")
  const getTopAnime = async () => {
    const data = await fetchTopAnime(type, subtype);
    setTopAnimeData(data);
    console.log(subtype, "sub")
    setIsloading(false);
  }
  useEffect(() => {
    setIsloading(true);
    getTopAnime();
  }, [subtype, type])

  return (
    <div>
      <TopAnimeFilter {...{ type, subtype, setType: { setType }, setSubtype: { setSubtype } }} />
      <div className={styles.topAnime}>
        {topAnimeData?.top?.map(anime => {
          return (
            <div className={styles.anime} key={anime.mal_id}>
              <div className={styles.animeDetailsWrapper}>
                <div className={styles.animeTitle}>{anime.title}</div>
                <div className={styles.animeDetails}>
                  {anime.episodes ? <div className={styles.animeEpisodes}> Episodes : {anime.episodes}</div> : null}
                  {anime.score ? <div className={styles.animeScore}><StarIcon className={styles.ratingStar} />{anime.score}</div> : null}
                </div>
              </div>
              <div><img className={styles.animeImage} src={anime.image_url} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopAnimeMain;