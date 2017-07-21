import { Component, OnInit } from '@angular/core';
import { MoviesService } from "../../services/movies.service";
import { GenreService } from "../../services/genre.service";
import { Movie } from "../../models/movie";
import { Genre } from "../../models/genre";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText: string;
  pagenumber: number = 1;
  movies: Movie[];
  allGenres: Genre[];
  movieGenre:string[];
  constructor(private movieservice: MoviesService, private genreService: GenreService) { 
     
  }
 
  ngOnInit() {
    this.getGenres();
  }
  search() {
    this.movieservice.searchMovies(this.searchText, this.pagenumber).subscribe(movies => {
      this.movies = movies.results;
    },
      err => {
        console.log(err);
        return false;
      });
  }

  getGenreNamebyID(ids:number[]){
    this.movieGenre=[];
    ids.forEach((x)=>
      { 
         if ( this.allGenres.find((res)=>res.id === x) !== undefined){
           this.movieGenre.push(this.allGenres.find((res)=>res.id === x).name);
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
