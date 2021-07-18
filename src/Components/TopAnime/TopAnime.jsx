import React, { useState } from 'react';
import { useEffect } from 'react';
import { fetchTopAnime } from '../../ApiService/api';
import Skeleton from '@material-ui/lab/Skeleton';
import StarIcon from '@material-ui/icons/Star';
import './TopAnime.scss'

const TopAnime = () => {
  const [topAnimeData, setTopAnimeData] = useState()
  const [isLoading, setIsloading] = useState(false)
  console.log(topAnimeData)
  const getTopAnime = async () => {
    const data = await fetchTopAnime();
    setTopAnimeData(data);
    setIsloading(false);
  }
  useEffect(() => {
    setIsloading(true);
    getTopAnime();
  }, [])
  return (
    <div className="topAnimeWrapper">
      <div className="topAnimeHeader">Top Anime</div>
      {!isLoading ?
        <div className="topAnime">
          {topAnimeData?.top?.map(anime => {
            return (
              <div className="anime" key={anime.mal_id}>
                <div className="animeDetailsWrapper">
                  <div className="animeTitle">{anime.title}</div>
                  <div className="animeDetails">
                    <div className="animeEpisodes">{anime.episodes ? `Episodes : ${anime.episodes}` : null}</div>
                    <div className="animeScore"><StarIcon className="ratingStar" />{anime.score}</div>
                  </div>
                </div>
                <div><img className="animeImage" src={anime.image_url} /></div>
              </div>
            );
          })}
        </div>
        :
        <div>
          <Skeleton animation="wave" variant="rect" height={400} width="100%" />
        </div>
      }
    </div>
  );

}
export default TopAnime;