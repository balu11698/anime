import React, { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import StarIcon from '@material-ui/icons/Star';
import { fetchSeasonalAnime, fetchSeasonsArchive } from '../../../ApiService/api';
import { useTransition, animated, config, useSpring } from 'react-spring';
import styles from './SeasonalAnimeMain.module.scss'
import SeasonalAnimeFilter from '../SeasonalAnimeFilter/SeasonalAnimeFilter';

const SeasonalAnimeDetailsMain = () => {
  const [seasonalAnimeData, setSeasonalAnimeData] = useState([])
  const [seasonArchive, setSeasonArchive] = useState([])
  const [season, setSeason] = useState("summer");
  const [year, setYear] = useState(2021)
  const [isLoading, setIsLoading] = useState(false)

  const seasonalAnime = useTransition(seasonalAnimeData.anime, {
    from: { opacity: 0, transform: "translate3d(-50px, 0px, 0px)" },
    enter: { opacity: 1, transform: "translate3d(0px, 0px, 0px)" },
    delay: 250,
    config:{tension:200,friction:10},
    // reset: true,
  })
  const spring = useSpring({
    from: { opacity: 0, transform: "translate3d(-50px, 0px, 0px)" },
    to: { opacity: 1, transform: "translate3d(0px, 0px, 0px)" },
    config: config.wobbly,

  })

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
      {
        isLoading ? <Skeleton animation="wave" variant="rect" height={250} width="100%" />
          :
          <div className={styles.seasonalAnime}>
            {
              seasonalAnime((style, anime) =>
                <animated.div style={style} className={styles.anime} key={anime.mal_id}>
                  <div className={styles.animeDetailsWrapper}>
                    <div className={styles.animeTitle}>{anime.title}</div>
                    <div className={styles.animeDetails}>
                      {anime.episodes ? <div className={styles.animeEpisodes}> Episodes : {anime.episodes} </div> : null}
                      <div className={styles.animeScore}><StarIcon className={styles.ratingStar} />{anime.score}</div>
                    </div>
                  </div>
                  <img className={styles.animeImage} src={anime.image_url} />
                </animated.div>
              )
              //   return (
              //     <animated.div style={spring} className={styles.anime} key={anime.mal_id}>
              //       <div className={styles.animeDetailsWrapper}>
              //         <div className={styles.animeTitle}>{anime.title}</div>
              //         <div className={styles.animeDetails}>
              //           {anime.episodes ? <div className={styles.animeEpisodes}> Episodes : {anime.episodes} </div> : null}
              //           <div className={styles.animeScore}><StarIcon className={styles.ratingStar} />{anime.score}</div>
              //         </div>
              //       </div>
              //       <div><img className={styles.animeImage} src={anime.image_url} /></div>
              //     </animated.div>
              //   );
              // })
            }
          </div>
      }

    </React.Fragment>
    // </div>
    // </div>
  );
}

export default SeasonalAnimeDetailsMain;