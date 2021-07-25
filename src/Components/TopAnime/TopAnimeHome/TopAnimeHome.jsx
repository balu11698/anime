import React, { useEffect, useState, useCallback } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import StarIcon from '@material-ui/icons/Star';
import { fetchTopAnime } from '../../../ApiService/api';
import styles from './TopAnimeHome.module.scss'
import { useTransition, useSpring, animated, config } from 'react-spring';

const TopAnimeHome = () => {
  const [topAnimeData, setTopAnimeData] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const getTopAnime = useCallback(async () => {
    const data = await fetchTopAnime("anime", null);
    setTopAnimeData(data);
    setIsloading(false);
  }, [isLoading])
  useEffect(() => {
    setIsloading(true);
    getTopAnime();
  }, [])

  const topAnime = useTransition(topAnimeData.top, {
    from: { opacity: 0, transform: "translate3d(-50px, 0px, 0px)" },
    enter: { opacity: 1, transform: "translate3d(0px, 0px, 0px)" },
    delay: 500,
    config: {tension:200,friction:10},
    // reset: true,
  })

  const spring = useSpring({
    from: { opacity: 0, transform: "translate3d(0%, -10%, 0px)" },
    to: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
    config: config.wobbly,
    // reset: true,
    delay: 500,
  })

  return (
    <div className={styles.topAnime}>
      {
        isLoading ? <Skeleton animation="wave" variant="rect" height={250} width="100%" />
          :
          topAnime((style, anime) =>
            <animated.div style={style} className={styles.anime} key={anime.mal_id}>
              <div className={styles.animeDetailsWrapper}>
                <div className={styles.animeTitle}>{anime.title}</div>
                <div className={styles.animeDetails}>
                  <div className={styles.animeEpisodes}>{anime.episodes ? `Episodes : ${anime.episodes}` : null}</div>
                  <div className={styles.animeScore}><StarIcon className={styles.ratingStar} />{anime.score}</div>
                </div>
              </div>
              <img className={styles.animeImage} src={anime.image_url} />
            </animated.div>
          )}
    </div>
  );

}

export default TopAnimeHome;