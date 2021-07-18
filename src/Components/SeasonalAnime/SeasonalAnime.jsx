import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { fetchSeasonalAnime } from '../../ApiService/api';
import SeasonalAnimeFilter from './SeasonalAnimeFilter/SeasonalAnimFilter';
import Skeleton from '@material-ui/lab/Skeleton';
import StarIcon from '@material-ui/icons/Star';
import './SeasonalAnime.scss'


const SeasonalAnime = (props) => {
  const [seasonalAnimeData, setSeasonalAnimeData] = useState()
  const [season, setSeason] = useState("summer");
  const [year, setYear] = useState(2021)
  const [isLoading, setIsLoading] = useState(false)
  const getSeasonalAnimeData = useCallback(async () => {
    const data = await fetchSeasonalAnime(season, year);
    setSeasonalAnimeData(data);
    setIsLoading(false)
  })
  useEffect(() => {
    setIsLoading(true)
    getSeasonalAnimeData();
  }, [season, year])
  function totalSeasonalAnime() {
    return (<div>Heeello</div>);
  }

  return (
    <div className="seasonalAnimeWrapper">
      <div className="seasonalAnimeHeader">Seasonal Anime</div>
      <div className="seasonalAnime">
        {(!isLoading) ? (props.page ?

          seasonalAnimeData?.anime.slice(0, 20).map(anime => {
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
          })
          :
          <div className="seasonalAnimeDetailsWrapper">
            <SeasonalAnimeFilter setSeason={setSeason} />
            <div className="seasonalAnimeDetails">
            {
              seasonalAnimeData?.anime.map(anime => {
                return (
                  <div className="anime" key={anime.mal_id}>
                    <div className="animeDetailsWrapper">
                      <div className="animeTitle">{anime.title}</div>
                      <div className="animeDetails">
                        <div className="animeEpisodes">Episodes : {anime.episodes}</div>
                        <div className="animeScore"><StarIcon className="ratingStar" />{anime.score}</div>
                      </div>
                    </div>
                    <div >
                      <img className="animeImage" src={anime.image_url} />
                    </div>
                  </div>
                );
              })}
              </div>
          </div>
        )
          : <div>
            <Skeleton animation="wave" variant="rect" height={250} width="100%" />
          </div>
        }
      </div>
    </div>

  );
}

export default SeasonalAnime;