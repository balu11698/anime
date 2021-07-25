import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { fetchQuotes } from '../../ApiService/api';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from './Quotes.module.scss'
import { useTransition, animated, config } from 'react-spring';

const Quotes = () => {
  const [quotesData, setQuotesData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const quotesSkeletonValue = 10;

  useEffect(() => {
    setIsLoading(true);
    const getQuotes = async () => {
      const data = await fetchQuotes();
      setQuotesData(data)
      setIsLoading(false)
    }
    getQuotes();
  }, [])

  const quotes = useTransition(quotesData, {
    from: { opacity: 0, transform: "translate3d(-50px, 0px, 0px)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
    delay: 250,
    config: { tension: 200, friction: 10 },
    // reset:true,
  })

  return (
    <div className={styles.quotesWrapper}>
      <div className={styles.quotesHeader}>Quotes</div>
      {!isLoading ?
        <>
          <div className="cardWrapper">
            {
              quotes((style,quote) =>
                <animated.div style={style} className={styles.card} key={quote.quote}>
                  <div><span className={styles.quoteLabel}>Anime Name :</span> {quote.anime}</div>
                  <div><span className={styles.quoteLabel}>Character : </span>{quote.character}</div>
                  <div><span className={styles.quoteLabel}>Quote : </span>{quote.quote}</div>
                </animated.div>
              )
            }
          </div>
        </>
        :
        <div>
          {(Array(10).fill(null).map((el, i) => {
            return <Skeleton className={styles.cardSkeleton} key={i} variant="rect" height={100} width="100%" />
          }))}
        </div>
      }
    </div>
  );
}
export default Quotes;