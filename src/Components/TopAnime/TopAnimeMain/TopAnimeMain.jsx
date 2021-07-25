import React, { useEffect, useState, useCallback } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import StarIcon from '@material-ui/icons/Star';
import { fetchTopAnime } from '../../../ApiService/api';
import styles from './TopAnimeMain.module.scss';
import TopAnimeFilter from '../TopAnimeFilter/TopAnimeFilter';
import { useTransition, useSpring, animated, config } from 'react-spring';

const TopAnimeMain = () => {
  const [topAnimeData, setTopAnimeData] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const [type, setType] = useState("anime")
  const [subtype, setSubtype] = useState("airing")

  const topAnime = useTransition(topAnimeData.top, {
    from: { opacity: 0, transform: "translate3d(-50px, 0px, 0px)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
    delay: 250,
    config: {tension:200,friction:10},
    // reset:true,
  })

  const spring = useSpring({
    from: { opacity: 0, transform: "translate3d(0%, -10%, 0px)" },
    to: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
    config: {tension:200,friction:10},
    // reset: true,
    delay:1000,
  })

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
    <React.Fragment>
      <TopAnimeFilter {...{ type, subtype, setType: { setType }, setSubtype: { setSubtype } }} />

      {isLoading ? <Skeleton animation="wave" variant="rect" height={250} width="100%" />
        :
        <div className={styles.topAnime}>
          {
            topAnime((style,anime)=>
              <animated.div style={style} className={styles.anime} key={anime.mal_id}>
                <div className={styles.animeDetailsWrapper}>
                  <div className={styles.animeTitle}>{anime.title}</div>
                  <div className={styles.animeDetails}>
                    {anime.episodes ? <div className={styles.animeEpisodes}> Episodes : {anime.episodes} </div> : null}
                    {anime.score ? <div className={styles.animeScore}><StarIcon className={styles.ratingStar} />{anime.score}</div> : null}
                  </div>
                </div>
                <img className={styles.animeImage} src={anime.image_url} />
              </animated.div>
              )
            // transition((style, anime) =>
            //   <animated.div style={style} className={styles.anime} key={anime.mal_id}>
            //     <div className={styles.animeDetailsWrapper}>
            //       <div className={styles.animeTitle}>{anime.title}</div>
            //       <div className={styles.animeDetails}>
            //         {anime.episodes ? <div className={styles.animeEpisodes}> Episodes : {anime.episodes} </div> : null}
            //         {anime.score ? <div className={styles.animeScore}><StarIcon className={styles.ratingStar} />{anime.score}</div> : null}
            //       </div>
            //     </div>
            //     <img className={styles.animeImage} src={anime.image_url} />
            //   </animated.div>
            // )
          }
        </div>
      }

    </React.Fragment>
  );
}

export default TopAnimeMain;