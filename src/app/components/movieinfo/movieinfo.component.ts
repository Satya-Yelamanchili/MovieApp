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
import { Constants } from "../../constants";

@Component({
  selector: 'app-movieinfo',
  templateUrl: './movieinfo.component.html',
  styleUrls: ['./movieinfo.component.css']
})
export class MovieinfoComponent implements OnInit {
  movieid: number;
  movieInfo: MovieInfo;
  movieGenre: string[];
  cast: Crew[];
  crew:Crew[];
  url:any;
  videos:Video[];
  safeURL:any;
  bgImgUrl:any;
  videoColl:any[];

  constructor(private route: ActivatedRoute, private movieService: MoviesService, private genreService: GenreService, private sanitizer: DomSanitizer) {

  }

  ngOnInit() {    
    this.getMovieId();
    this.getMovieDetails().subscribe();
    this.getMovieCrew();
    this.getMovieVideos().subscribe();
  }
  getMovieId() {
    this.route.params.subscribe((param: Params) => {
      this.movieid = param['id'];
    });
  }

  getMovieDetails() {
    return this.movieService.movieDetails(this.movieid)
      .map(movieInfo => {
        this.movieInfo = movieInfo;
        this.bgImgUrl = this.sanitizer.bypassSecurityTrustUrl(Constants.bgImg+this.movieInfo.backdrop_path);
      });
  }

    getMovieVideos() {
    return this.movieService.movieVideos(this.movieid)
      .map(videos => {
        this.videos = videos.results;
        if(this.videos.length > 0 && this.videos[0].site.toLowerCase() === "youtube"){
          this.url = "https://www.youtube.com/embed/" + this.videos[0].key;
          this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        }
      });
  }

  getSafeUrl(key:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + key);
  }

  getMovieCrew() {
    this.movieService.movieCredits(this.movieid).subscribe(movieCrew => {
      this.cast = movieCrew.cast.filter((item) => item.order <= 10);
      this.crew = movieCrew.crew;
    })
  }
}
