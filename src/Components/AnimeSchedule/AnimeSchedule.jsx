import React, { useCallback, useEffect, useState } from 'react';
import { fetchAnimeSchedule } from '../../ApiService/api';
import { useTransition, animated, config } from 'react-spring';
import Modal from '@material-ui/core/Modal';
import ModalComponent from '../ModalComponent/ModalComponent';
import StarIcon from '@material-ui/icons/Star';
import styles from './AnimeSchedule.module.scss';
import AnimeScheduleFilter from './AnimeScheduleFilter/AnimeScheduleFilter';

const AnimeSchedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [modalAnime, setModalAnime] = useState([]);
  const [open, setOpen] = useState(false)
  const [day,setDay] = useState("monday");

  useEffect(() => {
    // const date = new Date();
    // const todaysDay = date.toLocaleDateString('en-us', { weekday: 'long' })
    // setDay(todaysDay.toLocaleLowerCase());
    const getAnimeSchedule = async () => {
      const data = await fetchAnimeSchedule(day);
      setScheduleData(data)
    };
    getAnimeSchedule();
  }, [day])
  useEffect(() => {
    console.log(scheduleData,day)
  }, [scheduleData,day])

  const scheduleAnime = useTransition(scheduleData[day], {
    from: { opacity: 0, transform: "translate3d(-50px, 0px, 0px)" },
    enter: { opacity: 1, transform: "translate3d(0px, 0px, 0px)" },
    delay: 250,
    config: { tension: 200, friction: 10 },
    // reset: true,
  })

  const handleOpen = (animeDetails) => {
    setOpen(true);
    setModalAnime(animeDetails)
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <React.Fragment>
      <AnimeScheduleFilter {...{setDay:setDay}} />
      <div className={styles.seasonalAnime}>
        {
          scheduleAnime((style, anime) =>
            <animated.div style={style} className={styles.anime} key={anime.mal_id} onClick={handleOpen.bind(this, anime)}>
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
        }
        <Modal className={styles.modal} open={open} onClose={handleClose}>
          <ModalComponent {...{ modalAnime, page: "seasonal" }} />
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default AnimeSchedule;