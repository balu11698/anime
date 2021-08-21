import React, { useEffect, useState, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { fetchAnimeCharacterById } from '../../../ApiService/api';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from './Characters.module.scss';

const Characters = () => {

  const { url } = useRouteMatch();
  const animeId = url.split("/")[2];
  const [animeCharacters, setAnimeCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const mount = useRef(true);

  const getAnimeCharacters = async () => {
    const data = await fetchAnimeCharacterById(animeId);
    console.log(data, "data")
    if (mount.current === true && data) {
      setAnimeCharacters(data.data);
      setIsLoading(false);
    }
    else {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getAnimeCharacters();
    return () => { mount.current = false }
  }, [])

  console.log(animeCharacters)

  return (
    isLoading ? <Skeleton animation="wave" variant="rect" height={250} width="100%" /> :
      (!animeCharacters ? <div>Servers are BUSY try after sometime</div> :
        <div className={styles.detailsWrapper}>
          {animeCharacters?.map(data =>
            <div key={data.character.mal_id} className={styles.charactersWrapper}>
              <div className={styles.animeCharacter}>
                <div><img className={styles.characterImage} src={data.character.images.jpg.image_url} /></div>
                <div className={styles.characterDetails}>
                  <div>{data.character.name}</div>
                  <div>{data.role}</div>
                </div>
              </div>
              <div className={styles.voiceActorsWrapper}>
                {data.voice_actors.map(voice =>
                  <div key={voice.person.mal_id} className={styles.voiceActors}>
                    <div className={styles.personDetails}>
                      <div>{voice.person.name}</div>
                      <div>{voice.language}</div>
                    </div>
                    <div><img className={styles.characterImage} src={voice.person.images.jpg.image_url} /></div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )
  );
}

export default Characters;