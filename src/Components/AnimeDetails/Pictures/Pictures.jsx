import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { fetchAnimePictures } from '../../../ApiService/api';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from './Pictures.module.scss';

const Pictures = () => {

  const { url } = useRouteMatch();
  const animeId = url.split("/")[2];
  const [isLoading, setIsLoading] = useState(true);
  const [animePictures, setAnimePictures] = useState([]);

  const getAnimePictures = async () => {
    const data = await fetchAnimePictures(animeId);
    setAnimePictures(data);
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getAnimePictures();
  }, [])
  console.log(animePictures, "pic")
  return (
    isLoading ? <Skeleton animation="wave" variant="rect" height={250} width="100%" /> :
      (animePictures?.length == 0 || animePictures?.status || !animePictures) ? <div>Servers are BUSY. Please try again after sometime</div> :
        <div className={styles.imageWrapper}>
          {animePictures?.data?.map((pictures, index) =>
            <img className={styles.image} key={index} src={pictures.image_url} />
          )}
        </div>
  )
}

export default Pictures;