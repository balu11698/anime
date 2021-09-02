import AnimeDetailsHome from "../Components/AnimeDetails/AnimeDetailsHome";
import Characters from "../Components/AnimeDetails/Characters/Characters";
import AnimeSchedule from "../Components/AnimeSchedule/AnimeSchedule";
import AnimeGenre from "../Components/Genre/AnimeGenre/AnimeGenre";
import Manga from "../Components/Manga/Manga";
import Quotes from "../Components/Quotes/Quotes";
import SeasonalAnime from "../Components/SeasonalAnime/SeasonalAnime";
import TopCharacters from "../Components/Top Characters/TopCharacters";
import TopAnime from "../Components/TopAnime/TopAnime";

export const RoutePaths = [
  { name: "Top Anime", component: TopAnime, path: "/TopAnime" },
  { name: "Top Characters", component: TopCharacters, path: "/TopCharacters" },
  { name: "Seasonal Anime", component: SeasonalAnime, path: "/SeasonalAnime" },
  { name: "Schedule", component: AnimeSchedule, path: "/AnimeSchedule" },
  { name: "Genre", component: AnimeGenre, path: "/AnimeGenre" },
  { name: "Manga", component: Manga, path: "/Manga" },
  { name: "Quotes", component: Quotes, path: "/Quotes" },
  { name: "Details", component: AnimeDetailsHome, path: "/anime/:id" }
]

export const LinkPaths = [
  { name: "Top Anime", path: "/TopAnime" },
  { name: "Top Characters", path: "/TopCharacters" },
  { name: "Seasonal Anime", path: "/SeasonalAnime" },
  { name: "Schedule", path: "/AnimeSchedule" },
  { name: "Genre", path: "/AnimeGenre" },
  { name: "Manga", path: "/Manga" },
  { name: "Quotes", path: "/Quotes" },
]

// export const dynamicRoutePaths = [

//   // { name: "Characters", component: Characters, path: "/anime/:id/characters",linkPath:"characters" }
// ]

export const animeGenre = [
  { name: "action", id: 1 },
  { name: "adventure", id: 2 },
  { name: "cars", id: 3 },
  { name: "comedy", id: 4 },
  { name: "dementia", id: 5 },
  { name: "demons", id: 6 },
  { name: "mystery", id: 7 },
  { name: "drama", id: 8 },
  { name: "ecchi", id: 9 },
  { name: "fantasy", id: 10 },
  { name: "game", id: 11 },
  { name: "hentai", id: 12 },
  { name: "historical", id: 13 },
  { name: "horror", id: 14 },
  { name: "kids", id: 15 },
  { name: "magic", id: 16 },
  { name: "martial arts", id: 17 },
  { name: "mecha", id: 18 },
  { name: "music", id: 19 },
  { name: "parody", id: 20 },
  { name: "samurai", id: 21 },
  { name: "romance", id: 22 },
  { name: "school", id: 23 },
  { name: "sci fi", id: 24 },
  { name: "shoujo", id: 25 },
  { name: "shoujo ai", id: 26 },
  { name: "shounen", id: 27 },
  { name: "shounen ai", id: 28 },
  { name: "space", id: 29 },
  { name: "sports", id: 30 },
  { name: "super power", id: 31 },
  { name: "vampire", id: 32 },
  { name: "yaoi", id: 33 },
  { name: "yuri", id: 34 },
  { name: "harem", id: 35 },
  { name: "slice of life", id: 36 },
  { name: "supernatural", id: 37 },
  { name: "military", id: 38 },
  { name: "police", id: 39 },
  { name: "psychological", id: 40 },
  { name: "thriller", id: 41 },
  { name: "seinen", id: 42 },
  { name: "josei", id: 43 }
]

export const convertTime = (time) => {
  const date = new Date(time);
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}