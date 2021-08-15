import React, { useEffect, useState } from 'react';
import { fetchAnimeGenre } from '../../../ApiService/api';
import Modal from '@material-ui/core/Modal';
import ModalComponent from '../../ModalComponent/ModalComponent';
import Skeleton from '@material-ui/lab/Skeleton';
import StarIcon from '@material-ui/icons/Star';
import styles from './AnimeGenre.module.scss';
import AnimeGenreFilter from './AnimeGenreFilter/AnimeGenreFilter';
import { useHistory } from 'react-router-dom';

const AnimeGenre = () => {
  const [animeGenreData, setAnimeGenreData] = useState([]);
  const [genreId, setGenreId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalAnime, setModalAnime] = useState([]);
  const history = useHistory()
  const getAnimeGenre = async () => {
    const data = await fetchAnimeGenre(genreId);
    setAnimeGenreData(data)
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getAnimeGenre();
  }, [genreId])

  const handleOpen = (animeDetails) => {
    setOpen(true);
    setModalAnime(animeDetails)
  };


  const handleClose = () => {
    setOpen(false);
  };

  const animeDetails = anime => history.push(`/anime/${anime.mal_id}`)

  return (
    <React.Fragment>
      <AnimeGenreFilter {...{ setGenreId: setGenreId }} />
      {
        isLoading ? <Skeleton animation="wave" variant="rect" height={250} width="100%" />
          :
          <div className={styles.animeGenre} >
            {
              animeGenreData?.anime?.map(anime =>
                <div className={styles.anime} key={anime.mal_id} onClick={animeDetails.bind(this, anime)}>
                  <div className={styles.animeDetailsWrapper}>
                    <div className={styles.animeTitle}>{anime.title}</div>
                    <div className={styles.animeDetails}>
                      {anime.episodes ? <div className={styles.animeEpisodes}> Episodes : {anime.episodes} </div> : null}
                      <div className={styles.animeScore}><StarIcon className={styles.ratingStar} />{anime.score}</div>
                    </div>
                  </div>
                  <img className={styles.animeImage} src={anime.image_url} />
                </div>
              )
            }
            <Modal className={styles.modal} open={open} onClose={handleClose} >
              <ModalComponent {...{ modalAnime, page: "seasonal", open: { setOpen } }} />
            </Modal >
          </div>
      }

    </React.Fragment>
  )
}

export default AnimeGenre;