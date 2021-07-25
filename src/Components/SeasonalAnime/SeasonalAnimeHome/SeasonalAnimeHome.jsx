import React, { useEffect, useCallback, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import StarIcon from '@material-ui/icons/Star';
import { fetchSeasonalAnime } from '../../../ApiService/api';
import styles from './SeasonalAnimeHome.module.scss'
import { useTransition, useSpring, animated, config } from 'react-spring';
import Modal from '@material-ui/core/Modal';
import ModalComponent from '../../ModalComponent/ModalComponent';

const SeasonalAnimeDetailsHome = () => {
  const [seasonalAnimeData, setSeasonalAnimeData] = useState([])
  const [season, setSeason] = useState("summer");
  const [year, setYear] = useState(2021)
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [modalAnime,setModalAnime] = useState([])
  const getSeasonalAnimeData = useCallback(async () => {
    const data = await fetchSeasonalAnime(season, year);
    setSeasonalAnimeData(data);
    setIsLoading(false)
  }, [])
  useEffect(() => {
    setIsLoading(true)
    getSeasonalAnimeData();
  }, [])
  const seasonalAnime = useTransition(seasonalAnimeData.anime, {
    from: { opacity: 0, transform: "translate3d(-50px, 0px, 0px)" },
    enter: { opacity: 1, transform: "translate3d(0px, 0px, 0px)" },
    delay: 500,
    config: { tension: 200, friction: 10 },
    // reset: true,
  })
  const spring = useSpring({
    from: { opacity: 0, transform: "translate3d(0%, -10%, 0px)" },
    to: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
    config: config.wobbly,
    // reset: true
  })
  const handleOpen = (animeDetails) => {
    setOpen(true);
    setModalAnime(animeDetails)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={spring} className={styles.seasonalAnime}>
      {
        isLoading ? <Skeleton animation="wave" variant="rect" height={240} width="100%" />
          :
          // seasonalAnimeData?.anime?.slice(0, 20).map(anime =>
          seasonalAnime((style, anime) =>
            <animated.div style={style} className={styles.anime} key={anime.mal_id} onClick={handleOpen.bind(this, anime)}>
              <div className={styles.animeDetailsWrapper}>
                <div className={styles.animeTitle}>{anime.title}</div>
                <div className={styles.animeDetails}>
                  <div className={styles.animeEpisodes}>{anime.episodes ? `Episodes : ${anime.episodes}` : null}</div>
                  <div className={styles.animeScore}><StarIcon className={styles.ratingStar} />{anime.score}</div>
                </div>
              </div>
              <img className={styles.animeImage} src={anime.image_url} />
            </animated.div>
          )
      }
      <Modal className={styles.modal} open={open} onClose={handleClose}>
        <ModalComponent {...{ modalAnime, page: "seasonal" }} />
      </Modal>
    </div>
  );
}

export default SeasonalAnimeDetailsHome;