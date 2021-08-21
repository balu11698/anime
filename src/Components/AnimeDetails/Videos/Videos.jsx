import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useRouteMatch } from 'react-router-dom';
import { fetchAnimeVideos } from '../../../ApiService/api';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from './Videos.module.scss';

const Videos = () => {

  const mount = useRef(true);

  const { url } = useRouteMatch();
  const animeId = url.split("/")[2];
  const [animeVideos, setAnimeVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAnimeVideos = async () => {
    const data = await fetchAnimeVideos(animeId);
    if (mount.current === true && data) {
      setAnimeVideos(data.data);
      setIsLoading(false);
    }
    else setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getAnimeVideos();
    return () => mount.current = false;
  }, [])

  console.log(animeVideos)

  return (
    isLoading ? <Skeleton animation="wave" variant="rect" height={250} width="100%" />  :
      (Object.keys(animeVideos) === 0 ? <div>Servers are BUSY try after sometime</div> :
        <div className={styles.videoWrapper}>
          {animeVideos?.promo?.map(video =>
            <div key={video.trailer.youtube_id} className={styles.videoDetails}>
              <div>{video.title}</div>
              <ReactPlayer controls={true} width={"100%"} height={300} url={video.trailer.embed_url} />
            </div>
          )}
        </div>)
  );
}

export default Videos;