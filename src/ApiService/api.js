import axios from 'axios';

export const fetchSeasonalAnime = (season, year) => {
    return new Promise((resolve, reject) => {
        resolve(axios.get(`https://api.jikan.moe/v3/season/${year}/${season}`).then(response => response.data));
    })
}
export const fetchTopAnime = () => {
    return new Promise((resolve, reject) => {
        resolve(axios.get(`https://api.jikan.moe/v3/top/anime/1`).then(response => response.data));
    })
}
export const fetchQuotes = () =>{
    
    return new Promise((resolve, reject) => {
        resolve(axios.get('https://animechan.vercel.app/api/quotes').then(response => response.data));
    })
}
