import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { fetchSeasonalAnime } from '../../ApiService/api';
import SeasonalAnimeFilter from './SeasonalAnimeFilter/SeasonalAnimFilter';
import Skeleton from '@material-ui/lab/Skeleton';
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
  console.log(seasonalAnimeData)
  useEffect(() => {
    setIsLoading(true)
    getSeasonalAnimeData();
  }, [season, year])
  function totalSeasonalAnime() {
    return (<div>Heeello</div>);
  }

  return (
    <div className="seasonalAnimeWrapper">
      Seasonal Anime
      <div className="seasonalAnime">
        {(!isLoading) ? (props.page ?
          seasonalAnimeData?.anime.slice(0, 15).map(anime => {
            return (
              <div className="anime" key={anime.mal_id}>
                <div className="animeDetailsWrapper">
                  <div className="animeTitle">{anime.title}</div>
                  <div className="animeDetails">
                    <div className="animeEpisodes">Episodes : {anime.episodes}</div>
                    <div className="animeScore">{anime.score}</div>
                  </div>
                </div>
                <div><img src={anime.image_url} /></div>
              </div>
            );
          })
          :
          // <SeasonalAnimeFilter setSeason={setSeason} />   
          seasonalAnimeData?.anime.map(anime => {
            return (
              <div className="anime" key={anime.mal_id}>
                <div>{anime.title}</div>
                <div><img src={anime.image_url} /></div>
              </div>
            );
          })
        )
          : <div>
            <Skeleton animation="wave" variant="rect" height={400} width="100%" />
          </div>
        }
      </div>
    </div>

  );
}

export default SeasonalAnime;