import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MoviesService } from "../../services/movies.service";
import { GenreService } from "../../services/genre.service";
import { MovieInfo } from "../../models/movieinfo";
import { Movie } from "../../models/movie";
import { Genre } from "../../models/genre";
import { Crew } from "../../models/crew";
import { Video } from "../../models/video";

@Component({
  selector: 'app-movieinfo',
  templateUrl: './movieinfo.component.html',
  styleUrls: ['./movieinfo.component.css']
})
export class MovieinfoComponent implements OnInit {
  movieid: number;
  movieInfo: MovieInfo;
  similarMovies: Movie[];
  allGenres: Genre[];
  movieGenre: string[];
  cast: Crew[];
  crew:Crew[];
  url:any;
  videos:Video[];

  constructor(private route: ActivatedRoute, private movieService: MoviesService, private genreService: GenreService, private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.getGenres();
    this.getMovieId();
    this.getMovieDetails().subscribe();
    this.getSimilarMovies().subscribe();
    this.getMovieCrew();
    this.getMovieVideos().subscribe();
    
  }

  getMovieId() {
    this.route.params.subscribe((param: Params) => {
      this.movieid = param['id'];
    });
  }

  getGenreNamebyID(ids: number[]) {
    this.movieGenre = [];
    ids.forEach((x) => {
      if (this.allGenres.find((res) => res.id === x) !== undefined) {
        this.movieGenre.push(this.allGenres.find((res) => res.id === x).name);
      }
    });
    return this.movieGenre;
  }

  getMovieDetails() {
    return this.movieService.movieDetails(this.movieid)
      .map(movieInfo => {
        this.movieInfo = movieInfo;
      });
  }

  getSimilarMovies() {
    return this.movieService.SimilarMovies(this.movieid)
      .map(movies => {
        this.similarMovies = movies.results;
      });
  }
    getMovieVideos() {
    return this.movieService.movieVideos(this.movieid)
      .map(videos => {
        this.videos = videos.results;
        if(this.videos.length > 0 && this.videos[0].site.toLowerCase() === "youtube"){
          this.url = "https://www.youtube.com/embed/" + this.videos[0].key;
        }
      });
  }

  getMovieCrew() {
    this.movieService.movieCredits(this.movieid).subscribe(movieCrew => {
      this.cast = movieCrew.cast.filter((item) => item.order <= 10);
      this.crew = movieCrew.crew;
    })
  }

  getGenres() {
    this.genreService.getGenre().subscribe(genres => {
      this.allGenres = genres.genres;
    },
      err => {
        console.log(err);
        return false;
      });
  }
}
