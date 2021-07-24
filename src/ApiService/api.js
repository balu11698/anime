import axios from 'axios';

export const fetchSeasonalAnime = (season, year) => {
  return new Promise((resolve, reject) => {
    resolve(axios.get(`https://api.jikan.moe/v3/season/${year}/${season}`).then(response => response.data));
  })
}
export const fetchTopAnime = (type,subtype) => {
  console.log(subtype)
  return new Promise((resolve, reject) => {
    if(subtype){
    resolve(axios.get(`https://api.jikan.moe/v3/top/${type}/1/${subtype}`).then(response => response.data));
    }
    else{
      resolve(axios.get(`https://api.jikan.moe/v3/top/${type}/1`).then(response => response.data));
    }
  })
}
export const fetchQuotes = () => {

  return new Promise((resolve, reject) => {
    resolve(axios.get('https://animechan.vercel.app/api/quotes').then(response => response.data));
  })
}

export const fetchSeasonsArchive = () => {
  return new Promise((resolve, reject) => {
    resolve(axios.get('https://api.jikan.moe/v3/season/archive').then(response => response.data));
  })
}
