import React,{useEffect,useState,useCallback} from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import StarIcon from '@material-ui/icons/Star';
import { fetchTopAnime } from '../../../ApiService/api';
import styles from './TopAnimeHome.module.scss'

const TopAnimeHome = () => {
  const [topAnimeData, setTopAnimeData] = useState()
  const [isLoading, setIsloading] = useState(false)
  const getTopAnime = useCallback(async () => {
    const data = await fetchTopAnime("anime",null);
    setTopAnimeData(data);
    setIsloading(false);
  }, [isLoading])
  useEffect(() => {
    setIsloading(true);
    getTopAnime();
  }, [])
  return (
    <div className={styles.topAnime}>
      {topAnimeData?.top?.map(anime => {
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
      })}
    </div>
  );

}

export default TopAnimeHome;