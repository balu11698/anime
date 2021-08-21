import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import { fetchAnimeNews } from '../../../ApiService/api';
import styles from './News.module.scss';

const News = () => {

  const { url } = useRouteMatch();
  const animeId = url.split("/")[2];
  const [isLoading, setIsLoading] = useState(true)
  const [animeNews, setAnimeNews] = useState([]);

  const getAnimeNews = async () => {
    const data = await fetchAnimeNews(animeId);
    console.log(data, "data")
    setAnimeNews(data)
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getAnimeNews();
  }, [])
  return (
    isLoading ? <Skeleton animation="wave" variant="rect" height={250} width="100%" /> :
      <div className={styles.newsWrapper}>
        {animeNews?.data?.map(news =>
          <div key={news.mal_id} className={styles.news}>
            <img className={styles.images} src={news.images.jpg.image_url} />
          </div>
        )}
      </div>
  );

}
export default News;