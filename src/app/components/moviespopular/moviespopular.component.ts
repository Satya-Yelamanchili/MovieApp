import { Component, OnInit } from '@angular/core';
import { MoviesService } from "../../services/movies.service";
import { GenreService } from "../../services/genre.service";
import { Movie } from "../../models/movie";
import { Genre } from "../../models/genre";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-moviespopular',
  templateUrl: './moviespopular.component.html',
  styleUrls: ['./moviespopular.component.css']
})
export class MoviespopularComponent implements OnInit {

  popularMovies: Movie[];
  movieGenre: string[];
  allGenres: Genre[];
  constructor(private moviesService: MoviesService, private genreService:GenreService) { 
    
  }

  ngOnInit() {
    this.getGenres();
    this.getPopularMovies(1);
  }

  getPopularMovies(pageNumber: number) {
    this.moviesService.popularMovies(pageNumber)
      .subscribe(movies => {
        this.popularMovies = movies.results.filter((item) => item.poster_path !== null)
      },
      err => {
        console.log(err);
        return false;
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
