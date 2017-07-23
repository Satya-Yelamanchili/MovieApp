import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MoviesService } from "../../services/movies.service";
import { GenreService } from "../../services/genre.service";
import { Movie } from "../../models/movie";
import { Genre } from "../../models/genre";

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
})
export class MovielistComponent implements OnInit {
@Input() movieid:number;
similarMovies:Movie[];
  allGenres: Genre[];
  movieGenre: string[];

  constructor(private movieService: MoviesService, private genreService: GenreService) { 

  }

  ngOnInit() {
    this.getGenres();
    this.getSimilarMovies().subscribe();
  }

    getSimilarMovies() {
    return this.movieService.SimilarMovies(this.movieid)
      .map(movies => {
        this.similarMovies = movies.results;
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
