import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { fetchAnimeSearch } from '../../../ApiService/api';
import Skeleton from '@material-ui/lab/Skeleton';
import StarIcon from '@material-ui/icons/Star';
import styles from './AnimeSearch.module.scss';

const AnimeSearch = () => {

  const { url } = useRouteMatch();
  const searchParam = url.split("/")[2];
  const history = useHistory();
  const location = useLocation();
  const [searchAnime, setSearchAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const getAnimeSearch = async () => {
    const data = await fetchAnimeSearch(searchParam);
    setSearchAnime(data);
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true);
    getAnimeSearch()
  }, [location])
  console.log(searchAnime)

  const animeDetails = anime => history.push(`/anime/${anime.mal_id}`)

  return (
    <React.Fragment>
      {
        isLoading ? <Skeleton animation="wave" variant="rect" height={250} width="100%" />
          :
          <div className={styles.searchAnime}>
            {
              // seasonalAnime((style, anime) =>
              searchAnime?.data?.map(anime =>
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
      }

    </React.Fragment>
  );

}

export default AnimeSearch;