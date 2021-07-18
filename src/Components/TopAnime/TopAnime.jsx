import React, { useState } from 'react';
import { useEffect } from 'react';
import { fetchTopAnime } from '../../ApiService/api';
import Skeleton from '@material-ui/lab/Skeleton';
import './TopAnime.scss'

const TopAnime = () => {
  const [topAnimeData, setTopAnimeData] = useState()
  const [isLoading, setIsloading] = useState(false)
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
      Top Anime
      {!isLoading ?
        <div className="topAnime">
          {topAnimeData?.top?.map(anime => {
            return (
              <div className="anime" key={anime.mal_id}>
                <div>{anime.title}</div>
                <div><img src={anime.image_url} /></div>
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