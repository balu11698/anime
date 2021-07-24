import React from 'react';
import { fetchTopAnime } from '../../ApiService/api';

import styles from './TopAnime.module.scss'

import TopAnimeHome from './TopAnimeHome/TopAnimeHome';
import TopAnimeMain from './TopAnimeMain/TopAnimeMain';

const TopAnime = (props) => {


  return (
    <div className={styles.topAnimeWrapper}>
      <div className={styles.topAnimeHeader}>Top Anime</div>
      {props.page && <TopAnimeHome />}
      {!props.page && <TopAnimeMain />}
    </div>
  );

}
export default TopAnime;