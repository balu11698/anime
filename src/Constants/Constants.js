import Home from "../Components/Home/Home";
import SeasonalAnime from "../Components/SeasonalAnime/SeasonalAnime";
import TopAnime from "../Components/TopAnime/TopAnime";

export const navigationTitles = [
    { name: "Home", component: Home, path: "/" },
    { name: "Top Anime", component: TopAnime, path: "/TopAnime" },
    { name: "Seasonal Anime", component: SeasonalAnime, path: "/SeasonalAnime" },
    { name: "Manga", component: Home, path: "/" },
    { name: "Quotes", component: Home, path: "/" }
]