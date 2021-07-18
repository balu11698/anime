import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { fetchQuotes } from '../../ApiService/api';
import Skeleton from '@material-ui/lab/Skeleton';
import './Quotes.scss'

const Quotes = () => {
  const [quotes, setQuotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const quotesSkeletonValue = 10;

  useEffect(() => {
    setIsLoading(true);
    const getQuotes = async () => {
      const data = await fetchQuotes();
      setQuotes(data)
      setIsLoading(false)
    }
    getQuotes();
  }, [])

  return (
    <>
      {!isLoading ?
        <>
          <div>Quotes</div>
          <div className="cardWrapper">
            {quotes.map(quote => {
              return (
                <Paper elevation={1} className="card" key={quote.quote}>
                  <div>Anime Name : {quote.anime}</div>
                  <div>Character : {quote.character}</div>
                  <div>Quote : {quote.quote}</div>
                </Paper>
              )
            })
            }
          </div>
        </>
        :
        <div>
          {(Array(10).fill(null).map((el , i) => {       
            return <Skeleton className="cardSkeleton" animation="wave" key={i} variant="rect" height={100} width="100%" />
          }))}
        </div>
      }
    </>
  );
}
export default Quotes;