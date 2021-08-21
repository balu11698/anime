import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useHistory, useRouteMatch, Route, useLocation } from 'react-router-dom';
import { fetchAnimeById } from '../../ApiService/api';
import { dynamicRoutePaths } from '../../Constants/Constants';
import Details from './Details/Details';
import Characters from './Characters/Characters';
import styles from './AnimeDetailsHome.module.scss';
import Videos from './Videos/Videos';
import Skeleton from '@material-ui/lab/Skeleton';
import News from './News/News';
import Pictures from './Pictures/Pictures';

const AnimeDetailsHome = () => {
  const history = useHistory();
  const location = useLocation();
  const [animeDetails, setAnimeDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { url } = useRouteMatch();
  const animeId = (url.split("/")[2]);

  const getAnimeById = async () => {
    const data = await fetchAnimeById(animeId);
    if (data) setAnimeDetails(data.data);
    setIsLoading(false)
  }

  useEffect(() => {
    let mount = false;
    setIsLoading(true);
    getAnimeById();
    return () => { mount = true }
  }, [url])
  // const { url } = useRouteMatch();
  console.log(location.pathname, "changed")

  return (
    isLoading ? <Skeleton animation="wave" variant="rect" height={250} width="100%" /> :
      <React.Fragment>
        {/* {dynamicRoutePaths.map(title => {
          return <Link className="navigationLinks" to={title.path} key={title.name}>{title.name}</Link>;
        })} */}
        <h3>{animeDetails?.title}</h3>
        <div className={styles.animeDetailsNavigation}>
          <NavLink exact className={styles.navigationLinks} activeClassName={styles.active} to={`${url}`}>Details</NavLink>
          <NavLink exact className={styles.navigationLinks} activeClassName={styles.active} to={`${url}/characters`}>Characters</NavLink>
          <NavLink exact className={styles.navigationLinks} activeClassName={styles.active} to={`${url}/videos`}>Videos</NavLink>
          <NavLink exact className={styles.navigationLinks} activeClassName={styles.active} to={`${url}/pictures`}>Picures</NavLink>
          <NavLink exact className={styles.navigationLinks} activeClassName={styles.active} to={`${url}/news`}>News</NavLink>
        </div>
        <Route exact path={`${url}/characters`} component={Characters} />
        <Route exact path={`${url}/videos`} component={Videos} />
        <Route exact path={`${url}/news`} component={News} />
        <Route exact path={`${url}/pictures`} component={Pictures} />
        <Route exact path={url} >
          <Details {...animeDetails} />
        </Route>
      </React.Fragment>
  );

}

export default AnimeDetailsHome;