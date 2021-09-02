import React, { forwardRef, useEffect, useState, useRef, useContext } from 'react';
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
import ReactPaginate from 'react-paginate';
import { Pagination } from '@material-ui/lab';

const SeasonalAnimeDetailsMain = () => {
  const [seasonalAnimeData, setSeasonalAnimeData] = useState([]);
  const [seasonArchive, setSeasonArchive] = useState([]);
  const [open, setOpen] = useState(false);
  const [season, setSeason] = useState("summer");
  const [year, setYear] = useState(2021);
  const [isLoading, setIsLoading] = useState(false);
  const [modalAnime, setModalAnime] = useState([]);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(1);
  const isFilterApplied = useRef(false);
  const history = useHistory();

  
  const getSeasonalAnimeData = async () => {
    console.log(season, "inside api")
    const data = await fetchSeasonalAnime(season, year, page);
    setSeasonalAnimeData(data);
    setPageCount(data.pagination.last_visible_page);
    setIsLoading(false)
  }

  useEffect(() => {
    isFilterApplied.current = true;
    setPage(1);
  }, [season, year])

  useEffect(() => {
    console.log(page, "page")
    if (isFilterApplied.current && page != 1) return
    setIsLoading(true)
    getSeasonalAnimeData();
  }, [season, year, page])

  useEffect(() => {
    console.log(seasonalAnimeData);
  }, [seasonalAnimeData])

  useEffect(async () => {
    const data = await fetchSeasonsArchive();
    setSeasonArchive(data.archive);
    console.log("seasonArchive api")
  }, [])


  const handleOpen = (animeDetails) => {
    setOpen(true);
    setModalAnime(animeDetails)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePageClick = (e, value) => {
    isFilterApplied.current = false;
    setPage(value);
  }

  const animeDetails = anime => history.push(`/anime/${anime.mal_id}`)


  return (
    <React.Fragment>
      <SeasonalAnimeFilter {...{ season, setSeason: { setSeason }, seasonArchive, year, setYear: { setYear } }} />
      {
        isLoading ? <Skeleton animation="wave" variant="rect" height={250} width="100%" />
          :
          <>
            <div className={styles.seasonalAnime}>
              {
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
            </div>
          </>
      }
      {pageCount == 1 || !pageCount ? null :
        <Pagination
          color="primary"
          onChange={handlePageClick}
          count={pageCount}
          page={page}
          size="small"
          className="pagination"
        />
      }
    </React.Fragment>
    // </div>
    // </div>
  );
}

export default SeasonalAnimeDetailsMain;