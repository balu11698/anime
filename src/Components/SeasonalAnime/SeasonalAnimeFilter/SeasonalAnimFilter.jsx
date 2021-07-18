import React from 'react';

const SeasonalAnimeFilter = (season) => {
  const seasons = ["Winter", "Spring", "Summer", "Fall"]
  const seasonHandler = (e) => {
    season.setSeason(e.target.value)
    console.log(e.target.value)
    // season(e.target.value)
  }
  return (
    <select onChange={seasonHandler}>
      {seasons.map(season => {
        return <option key={season} value={season.toLowerCase()}>{season}</option>
      })}
    </select>
  );
}

export default SeasonalAnimeFilter;