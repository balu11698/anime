import Home from "../Components/Home/Home";
import Manga from "../Components/Manga/Manga";
import Quotes from "../Components/Quotes/Quotes";
import SeasonalAnime from "../Components/SeasonalAnime/SeasonalAnime";
import TopAnime from "../Components/TopAnime/TopAnime";

export const navigationTitles = [
    { name: "Home", component: Home, path: "/" },
    { name: "Top Anime", component: TopAnime, path: "/TopAnime" },
    { name: "Seasonal Anime", component: SeasonalAnime, path: "/SeasonalAnime" },
    { name: "Manga", component: Manga, path: "/Manga" },
    { name: "Quotes", component: Quotes, path: "/Quotes" }
]