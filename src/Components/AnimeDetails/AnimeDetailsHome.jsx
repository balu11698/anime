import React, { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch, Route, useLocation } from 'react-router-dom';
import { fetchAnimeById } from '../../ApiService/api';
import { dynamicRoutePaths } from '../../Constants/Constants';
import Details from './Details/Details';
import Characters from './Characters/Characters';
import styles from './AnimeDetailsHome.module.scss';
import Videos from './Videos/Videos';
import Skeleton from '@material-ui/lab/Skeleton';

const AnimeDetailsHome = () => {
  const history = useHistory();
  const location = useLocation();
  const [animeDetails, setAnimeDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { url } = useRouteMatch();
  const animeId = url.split("/")[2];

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
  }, [])
  // const { url } = useRouteMatch();
  console.log(location)

  return (
    isLoading ? <Skeleton animation="wave" variant="rect" height={250} width="100%" /> :
      <React.Fragment>
        {/* {dynamicRoutePaths.map(title => {
          return <Link className="navigationLinks" to={title.path} key={title.name}>{title.name}</Link>;
        })} */}
        <h3>{animeDetails?.title}</h3>
        <div className={styles.animeDetailsNavigation}>
          <Link className={styles.navigationLinks} to={`${url}`}>Details</Link>
          <Link className={styles.navigationLinks} to={`${url}/characters`}>Characters</Link>
          <Link className={styles.navigationLinks} to={`${url}/videos`}>Videos</Link>
        </div>
        <Route path={`${url}/characters`} component={Characters} />
        <Route path={`${url}/videos`} component={Videos} />
        <Route exact path={url}>
          <Details {...animeDetails} />
        </Route>
      </React.Fragment>
  );

}

export default AnimeDetailsHome;