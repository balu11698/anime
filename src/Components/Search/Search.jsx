import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import AsyncSelect from 'react-select/async';
import { fetchAnimeSearch } from '../../ApiService/api';
import styles from './Search.module.scss';

const Search = () => {

  const timeout = useRef();
  const searchRef = useRef(null);
  const searchResultsRef = useRef(null);
  const searched = useRef(false);
  const searchParam = useRef();
  const [searchAnime, setSearchAnime] = useState([])
  const [isVisible, setIsVisible] = useState(true);
  const history = useHistory();


  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = event => {
    if ((searchRef.current && !searchRef.current.contains(event.target)) || (searchResultsRef.current?.contains(event.target))) {
      setIsVisible(false);
    }
    else {
      setIsVisible(true);
    }
  };

  const loadOptions = async (inputValue) => {
    console.log(inputValue, "inputValue")
    if (inputValue && !searched.current) {
      const data = await fetchAnimeSearch(inputValue);
      setSearchAnime(data.data);
      setIsVisible(true);
    }
    else {
      setSearchAnime();
      searched.current = false;
    }
  }


  const debounce = (func, time, input) => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      func(input)
    }
      , time)
  }

  const debounceOptions = (e) => debounce(loadOptions, 1000, e.target.value)

  const changeHandler = (e) => {
    let selectedOption;
    searchParam.current = e.target.value
    let filtered = searchAnime?.filter(item => item.title === searchParam.current)
    if (filtered?.length) selectedOption = filtered[0]
    else selectedOption = {}
    if (Object.keys(selectedOption)?.length) {
      searched.current = true;
      history.push(`/anime/${selectedOption.mal_id}`)
    }
  }

  const submitHandler = (e) => {
    if (e.key == "Enter") {
      setIsVisible(false);
      history.push(`/search/${searchParam.current}`)
    }
  }

  const searchedFunc = anime => history.push(`/anime/${anime.mal_id}`)

  return (
    <div className={styles.search} ref={searchRef}>
      <div className={styles.searchLabel}>Search </div>
      <div>
        <input type="search" className={styles.searchInput} list="animeList" id="input" autoComplete="off" onChange={debounceOptions} onInput={changeHandler} onKeyDown={submitHandler} />
        {isVisible && <div className={styles.searchResult} ref={searchResultsRef}>
          {searchAnime?.map(anime =>
            <div key={anime.mal_id} className={styles.animeList} onClick={searchedFunc.bind(this, anime)}>{anime.title}</div>
          )}
        </div>
        }
      </div>
    </div>
  );

}

export default Search;