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
    <div className="quotesWrapper">
      <div className="quotesHeader">Quotes</div>
      {!isLoading ?
        <>
          <div className="cardWrapper">
            {quotes.map(quote => {
              return (
                <div className="card" key={quote.quote}>
                  <div><span className="quoteLabel">Anime Name :</span> {quote.anime}</div>
                  <div><span className="quoteLabel">Character : </span>{quote.character}</div>
                  <div><span className="quoteLabel">Quote : </span>{quote.quote}</div>
                </div>
              )
            })
            }
          </div>
        </>
        :
        <div>
          {(Array(10).fill(null).map((el, i) => {
            return <Skeleton className="cardSkeleton" key={i} variant="rect" height={100} width="100%" />
          }))}
        </div>
      }
    </div>
  );
}
export default Quotes;