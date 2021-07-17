import React, { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { fetchSeasonalAnime } from '../../ApiService/api';

const SeasonalAnime = (seasonalAnimeData) => {

  return (

    seasonalAnimeData?.anime?.map(anime => {
      return (
        <div key={anime.mal_id}>
          <div>{anime.title}</div>
        </div>
      );
    })

    // <div></div>
  );
}

export default SeasonalAnime;