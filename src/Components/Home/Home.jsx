import React, { useState } from 'react';
import Quotes from '../Quotes/Quotes';
import SeasonalAnime from '../SeasonalAnime/SeasonalAnime';
import TopAnime from '../TopAnime/TopAnime';

const Home = () => {

  return (
    <div>
      <SeasonalAnime page="fromHome" />
      <TopAnime />
      {/* <Quotes /> */}
    </div>
  );
}
export default Home;