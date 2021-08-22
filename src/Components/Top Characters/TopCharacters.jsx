import React, { useState, useEffect } from 'react';
import { fetchTopCharacters } from '../../ApiService/api';
import styles from './TopCharacters.module.scss';
import { Pagination } from '@material-ui/lab';
import Skeleton from '@material-ui/lab/Skeleton';

const TopCharacters = () => {

  const [topCharacters, setTopCharacters] = useState([]);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const getTopCharacters = async () => {
    const data = await fetchTopCharacters(page);
    setTopCharacters(data);
    setPageCount(data.pagination.last_visible_page);
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getTopCharacters();

  }, [page])

  const handlePageClick = (e, value) => {
    setPage(value)
  }

  console.log(topCharacters)

  return (
    <div>
      {isLoading ? <Skeleton animation="wave" variant="rect" height={250} width="100%" /> :
        <>
          {topCharacters?.data?.map((character,index) =>
            <div key={index} className={styles.characterWrapper}>
              <img className={styles.characterImage} src={character.images.jpg.image_url} />
              <div><span>Name: </span>{character.name}</div>
              <div>{character.about}</div>
            </div>
          )}
          {pageCount == 1 || !pageCount ? null :
            <Pagination
              color="primary"
              onChange={handlePageClick}
              count={pageCount}
              page={page}
              size="small"
              className="pagination"
            />}
        </>
      }
    </div>
  )

}

export default TopCharacters;