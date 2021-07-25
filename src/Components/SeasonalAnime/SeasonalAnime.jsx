import React from 'react';
import SeasonalAnimeDetailsHome from './SeasonalAnimeHome/SeasonalAnimeHome';
import SeasonalAnimeDetailsMain from './SeasonalAnimeMain/SeasonalAnimeMain';
import styles from './SeasonalAnime.module.scss'
import { useSpring,animated,config } from 'react-spring';

const SeasonalAnime = (props) => {
  const spring = useSpring({
    from: { opacity: 0, transform: "translate3d(-10%, 0px, 0px)" },
    to: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
    config:config.wobbly,
  })

  return (
    <div className={styles.seasonalAnimeWrapper}>
      <div style={spring} className={styles.seasonalAnimeHeader}>Seasonal Anime</div>
      {props.page && <SeasonalAnimeDetailsHome />}
      {!props.page && <SeasonalAnimeDetailsMain />}
    </div>

  );
}

export default SeasonalAnime;