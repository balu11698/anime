import axios from 'axios';

export const fetchSeasonalAnime = (seeason,year) => {
    return new Promise((resolve, reject) => {
        resolve(axios.get(`https://api.jikan.moe/v3/season/${year}/${seeason}`).then(response => response.data));
    })
}
