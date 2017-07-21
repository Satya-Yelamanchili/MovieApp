import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Genre } from "../models/genre";
import { Constants } from "../constants";

@Injectable()
export class GenreService {
  genreUrl:string
    
  constructor(private http:Http) { }

  getGenre(){
    this.genreUrl = Constants.baseApiUrl + Constants.genre + Constants.apiKey;
    return this.http.get(this.genreUrl).map(res=> res.json());
  }

}
