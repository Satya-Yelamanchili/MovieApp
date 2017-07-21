export class Constants {
    public static baseApiUrl = "https://api.themoviedb.org/3";
    public static apiKey = "0640d4d11a01991c0113b2ac4d04276f";
    public static movieSearch = "/search/movie?api_key=";
    public static moviePopular = "/movie/popular?api_key=";
    public static movieDetails = "/movie/{movie_id}?api_key="
    public static movieKeywords = "/movie/{movie_id}/keywords?api_key="
    public static movieVideos= "/movie/{movie_id}/videos?api_key="
    public static similarMovies = "/movie/{movie_id}/similar?api_key="
    public static movieCredits = "/movie/{movie_id}/credits?api_key=";
    public static personSearch = "/search/person?api_key=";
    public static personinfo = "/person/{person_id}?api_key=";
    public static personMovieCredits = "/person/{person_id}/movie_credits?api_key="
    public static tvSearch = "/search/tv?api_key=";
    public static genre = "/genre/movie/list?api_key=";
}