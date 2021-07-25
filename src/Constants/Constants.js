import AnimeSchedule from "../Components/AnimeSchedule/AnimeSchedule";
import Manga from "../Components/Manga/Manga";
import Quotes from "../Components/Quotes/Quotes";
import SeasonalAnime from "../Components/SeasonalAnime/SeasonalAnime";
import TopAnime from "../Components/TopAnime/TopAnime";

export const navigationTitles = [

    { name: "Top", component: TopAnime, path: "/TopAnime" },
    { name: "Seasonal Anime", component: SeasonalAnime, path: "/SeasonalAnime" },
    { name: "Schedule", component: AnimeSchedule, path: "/AnimeSchedule" },
    { name: "Manga", component: Manga, path: "/Manga" }, ,
    { name: "Quotes", component: Quotes, path: "/Quotes" }
]