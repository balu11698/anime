import axios from 'axios';

export const fetchSeasonalAnime = (season, year,page) => {
  return new Promise((resolve, reject) => {
    resolve(axios.get(`https://api.jikan.moe/v4/seasons/${year}/${season}?page=${page}`).then(response => response.data));
  })
}
export const fetchTopAnime = (type, subtype) => {
  console.log(subtype)
  return new Promise((resolve, reject) => {
    if (subtype) {
      resolve(axios.get(`https://api.jikan.moe/v3/top/${type}/1/${subtype}`).then(response => response.data));
    }
    else {
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

export const fetchAnimeSchedule = (day) => {
  return new Promise((resolve, reject) => {
    resolve(axios.get(`https://api.jikan.moe/v3/schedule/${day}`).then(response => response.data));
  })
}

export const fetchAnimeGenre = (genreId) => {
  return new Promise((resolve, reject) => {
    resolve(axios.get(`https://api.jikan.moe/v3/genre/anime/${genreId}/1`).then(response => response.data));
  })
}

export const fetchAnimeById = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.jikan.moe/v4/anime/${id}`).then(response => resolve(response.data)).catch(response => resolve(false));
  })
}

export const fetchAnimeCharacterById = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`).then(response => resolve(response.data)).catch(response => resolve(false));
  })
}

export const fetchAnimeVideos = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.jikan.moe/v4/anime/${id}/videos`).then(response => resolve(response.data)).catch(response => resolve(false));
  })
}

export const fetchAnimeSearch = (value) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.jikan.moe/v4/anime?q=${value}`).then(response => resolve(response.data)).catch(response => resolve(false));
  })
}

export const fetchAnimeNews = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.jikan.moe/v4/anime/${id}/news`).then(response => resolve(response.data)).catch(response => resolve(false));
  })
}

export const fetchAnimePictures = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.jikan.moe/v4/anime/${id}/pictures`).then(response => resolve(response.data)).catch(response => resolve(false));
  })
}