import React, { forwardRef, useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import StarIcon from '@material-ui/icons/Star';
import { fetchSeasonalAnime, fetchSeasonsArchive } from '../../../ApiService/api';
import { useTransition, animated, config, useSpring } from 'react-spring';
import styles from './SeasonalAnimeMain.module.scss'
import SeasonalAnimeFilter from '../SeasonalAnimeFilter/SeasonalAnimeFilter';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import ModalComponent from '../../ModalComponent/ModalComponent';
import { useHistory } from 'react-router-dom';


const SeasonalAnimeDetailsMain = () => {
  const [seasonalAnimeData, setSeasonalAnimeData] = useState([]);
  const [seasonArchive, setSeasonArchive] = useState([]);
  const [open, setOpen] = useState(false);
  const [season, setSeason] = useState("summer");
  const [year, setYear] = useState(2021);
  const [isLoading, setIsLoading] = useState(false);
  const [modalAnime, setModalAnime] = useState([]);
  const history = useHistory();

  const seasonalAnime = useTransition(seasonalAnimeData.anime, {
    from: { opacity: 0, transform: "translate3d(-50px, 0px, 0px)" },
    enter: { opacity: 1, transform: "translate3d(0px, 0px, 0px)" },
    delay: 250,
    config: { tension: 200, friction: 10 },
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
  useEffect(() => {
    console.log(seasonalAnimeData);
  }, [seasonalAnimeData])
  useEffect(async () => {
    const data = await fetchSeasonsArchive();
    setSeasonArchive(data.archive);
    console.log("seasonArchive api")
  }, [])

  // console.log(seasonalAnimeData)

  const handleOpen = (animeDetails) => {
    setOpen(true);
    setModalAnime(animeDetails)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const animeDetails = anime => history.push(`/anime/${anime.mal_id}`)

  const body =
    // console.log(animeDetails)
    <div className={styles.paper}>
      <h2 id="simple-modal-title">Hello</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>


  return (
    <React.Fragment>
      <SeasonalAnimeFilter {...{ season, setSeason: { setSeason }, seasonArchive, year, setYear: { setYear } }} />
      {
        isLoading ? <Skeleton animation="wave" variant="rect" height={250} width="100%" />
          :
          <div className={styles.seasonalAnime}>
            {
              // seasonalAnime((style, anime) =>
              seasonalAnimeData?.data?.map(anime =>
                <div className={styles.anime} key={anime.mal_id} onClick={animeDetails.bind(this, anime)}>
                  <div className={styles.animeDetailsWrapper}>
                    <div className={styles.animeTitle}>{anime.title}</div>
                    <div className={styles.animeDetails}>
                      {anime.episodes ? <div className={styles.animeEpisodes}> Episodes : {anime.episodes} </div> : null}
                      <div className={styles.animeScore}><StarIcon className={styles.ratingStar} />{anime.score}</div>
                    </div>
                  </div>
                  <img className={styles.animeImage} src={anime.images.jpg.image_url} />
                </div>
              )
            }
            <Modal className={styles.modal} open={open} onClose={handleClose}>
              <ModalComponent {...{ modalAnime, page: "seasonal", open: { setOpen } }} />
            </Modal>
          </div>
      }

    </React.Fragment>
    // </div>
    // </div>
  );
}

export default SeasonalAnimeDetailsMain;