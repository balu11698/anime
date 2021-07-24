import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import SeasonalAnimeDetailsHome from './SeasonalAnimeHome/SeasonalAnimeHome';
import SeasonalAnimeDetailsMain from './SeasonalAnimeMain/SeasonalAnimeMain';
import styles from './SeasonalAnime.module.scss'

const SeasonalAnime = (props) => {

  function totalSeasonalAnime() {
    return (<div>Heeello</div>);
  }
  return (
    <div className={styles.seasonalAnimeWrapper}>
      <div className={styles.seasonalAnimeHeader}>Seasonal Anime</div>
      {props.page && <SeasonalAnimeDetailsHome />}
      {!props.page && <SeasonalAnimeDetailsMain />}
    </div>

  );
}

export default SeasonalAnime;