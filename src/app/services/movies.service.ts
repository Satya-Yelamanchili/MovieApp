import { Injectable } from '@angular/core';
import { Http, HttpModule } from "@angular/http";
import { Movie } from "../models/movie";
import { Constants } from "../constants";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MoviesService {
  movieSearchUrl: string;
  popularMoviesUrl: string;
  movieDetailsUrl: string;
  similarMoviesUrl: string;
  movieCreditsUrl: string;
  movieVideosUrl:string;
  constructor(private http: Http) { }

  searchMovies(name: string, pageNumber: number) {

    this.movieSearchUrl = Constants.baseApiUrl + Constants.movieSearch + Constants.apiKey + "&query=" + name + "&page=" + pageNumber;
    return this.http.get(this.movieSearchUrl).map(res => res.json());
  }

  popularMovies(pageNumber: number) {
    this.popularMoviesUrl = Constants.baseApiUrl + Constants.moviePopular + Constants.apiKey + "&page=" + pageNumber;
    return this.http.get(this.popularMoviesUrl).map(res => res.json());
  }

  movieDetails(movieId: number) {
    this.movieDetailsUrl = Constants.baseApiUrl + Constants.movieDetails.replace("{movie_id}", movieId.toString()) + Constants.apiKey;
    return this.http.get(this.movieDetailsUrl).map(res => res.json());
  }

  SimilarMovies(movieId: number) {
    this.similarMoviesUrl = Constants.baseApiUrl + Constants.similarMovies.replace("{movie_id}", movieId.toString()) + Constants.apiKey;
    return this.http.get(this.similarMoviesUrl).map(res => res.json());
  }

  movieCredits(movieId: number) {
    this.movieCreditsUrl = Constants.baseApiUrl + Constants.movieCredits.replace("{movie_id}", movieId.toString()) + Constants.apiKey;
    return this.http.get(this.movieCreditsUrl).map(res=>res.json() ||{});
  }

    movieVideos(movieId: number) {
    this.movieVideosUrl = Constants.baseApiUrl + Constants.movieVideos.replace("{movie_id}", movieId.toString()) + Constants.apiKey;
    return this.http.get(this.movieVideosUrl).map(res=>res.json() ||{});
  }
}
