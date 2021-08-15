import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useHistory,useRouteMatch } from 'react-router-dom';
import { fetchAnimeById } from '../../../ApiService/api';
import styles from './Details.module.scss';

const Details = (animeDetails) => {


  const animeDetailsStats = ["rank", "popularity", "members", "rating", "status", "episodes", "duration", "type", "source", "year", "season"];
  const animeDetailsInfo = ["genres", "studios", "producers", "licensors"];
  console.log(animeDetails, "animeDetails")
  return (
    <React.Fragment>
      {(Object.keys(animeDetails).length === 0 && animeDetails.constructor === Object) ? <div>Servers are BUSY try after sometime</div> :
        <>
          <div className={styles.animeDetailsWrapper}>
            <div className={styles.animeImage}><img src={animeDetails?.images?.jpg?.image_url} /></div>
            <div className={styles.detailsWrapper}>
              {animeDetails?.score ?
                <div className={styles.details}>
                  <span className={styles.detailsLabel}>Score</span>
                  <div>{animeDetails?.score} ({animeDetails?.scored_by} users)</div>
                </div>
                : null}
              <div className={styles.detailsWrapper}>
                {animeDetailsStats.map(details =>
                  animeDetails[details] ?
                    <div key={details} className={styles.details}>
                      <span className={styles.detailsLabel}>{details}</span>
                      <div>{animeDetails[details]}</div>
                    </div>
                    : null
                )}
              </div>
            </div>
            <div className={styles.detailsWrapper}>
              {animeDetailsInfo.map(details =>
                animeDetails[details]?.length !== 0 ?
                  <div className={styles.infoDetails} key={details}>
                    <span className={styles.detailsLabel}>{details}</span>
                    <div className={styles.animeInfoWrapper}>{animeDetails[details]?.map(producer =>
                      <div className={styles.animeInfo} key={producer.mal_id}>
                        {producer.name}
                      </div>
                    )}</div>
                  </div>
                  : null
              )}
            </div>
          </div>
          <div className={styles.animeSynopsis}>
            <div className={styles.detailsLabel}>Synopsis </div>
            <div>{animeDetails?.synopsis}</div>
          </div>
          {animeDetails?.trailer?.embed_url ?
            <div className={styles.animeTrailer}>
              <div className={styles.detailsLabel}>Trailer </div>
              <ReactPlayer controls={true} width={"100%"} height={300} url={animeDetails?.trailer?.embed_url} />
            </div>
            : null}
          <div className={styles.alternateTitleWrapper}>
            <div className={styles.detailsLabel}>Alternate Titles </div>
            <div className={styles.alternateTitle}>
              <div className={styles.detailsLabel}>English</div> {animeDetails?.title_english}
            </div>
            <div className={styles.alternateTitle}>
              <div className={styles.detailsLabel}>Japanese</div> {animeDetails?.title_japanese}
            </div>
            <div className={styles.alternateTitle}>
              {animeDetails?.title_synonyms?.length !== 0 ?
                <>
                  <div className={styles.detailsLabel}>Synonym</div>
                  <div className={styles.synonymWrapper}>
                    {animeDetails?.title_synonyms?.map(synonym =>
                      <div className={styles.synonym} key={synonym}>
                        {synonym}
                      </div>)}
                  </div>
                </>
                : null}
            </div>
          </div>
        </>
      }
    </React.Fragment>
  )
}

export default Details;