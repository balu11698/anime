import React from 'react';
import { useState } from 'react';
import styles from './TopAnimeFilter.module.scss'

const TopAnimeFilter = ({ type, subtype, setType, setSubtype }) => {
  const types = ['anime'];
  const animeSubtype = ['airing', 'upcoming', 'tv', 'movie', 'ova', 'special', 'bypopularity', 'favorite'];
  const mangaSubtype = ['manga', 'novels', 'oneshots', 'manhwa', 'manhua', 'bypopularity', 'favorite'];
  const typeHandler = (e) => {
    let value = e.target.value;
    setType.setType(value);
    if (value == "anime") {
      setSubtype.setSubtype("airing");
    }
    if (value == "manga") {
      setSubtype.setSubtype("manga");
    }
    console.log(e.target.value)
  }
  const subtypeHandler = (e) => {
    setSubtype.setSubtype(e.target.value);
  }
  return (
    <div className={styles.filtersWrapper}>
      {/* <select className={styles.typeFilter} onChange={typeHandler}>
        {types.map(option => {
          return <option key={option} value={option}>{option}</option>
        })}
      </select> */}
      {type == "anime" && <select value={subtype} className={styles.subtypeFilter} onChange={subtypeHandler}>
        {animeSubtype.map(option => {
          return <option key={option} value={option}>{option}</option>
        })}
      </select>}
      {type == "manga" && <select value={subtype} className={styles.subtypeFilter} onChange={subtypeHandler}>
        {mangaSubtype.map(option => {
          return <option key={option} value={option}>{option}</option>
        })}
      </select>}
    </div>
  );
}

export default TopAnimeFilter;