import React from 'react';
import { animeGenre } from '../../../../Constants/Constants';
import styles from './AnimeGenreFilter.module.scss';

const AnimeGenreFilter = (setGenreId) => {

  const genreIdHandler = (e) => {
    setGenreId.setGenreId(e.target.value)
  }

  return (
    <select className={styles.genreFilter} onChange={genreIdHandler}>
      {animeGenre.map(genre =>
        <option key={genre.id} value={genre.id}>{genre.name}</option>
      )}
    </select>
  );
}

export default AnimeGenreFilter;