import React from 'react';
import styles from './TopAnime.module.scss'
import TopAnimeHome from './TopAnimeHome/TopAnimeHome';
import TopAnimeMain from './TopAnimeMain/TopAnimeMain';
import { useSpring, animated, config } from 'react-spring';

const TopAnime = (props) => {
 
  const spring = useSpring({
    from: { opacity: 0, transform: "translate3d(-10%, 0px, 0px)" },
    to: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
    // reset: true,
    config:config.wobbly,
  })

  return (
    <div className={styles.topAnimeWrapper}>
      <div style={spring} className={styles.topAnimeHeader}>Top Anime</div>
      {props.page && <TopAnimeHome />}
      {!props.page && <TopAnimeMain />}
    </div>
  );

}
export default TopAnime;