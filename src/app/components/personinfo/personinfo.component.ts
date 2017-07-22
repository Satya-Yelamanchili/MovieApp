import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { PeopleService } from "../../services/people.service";
import { PersonInfo } from "../../models/personinfo";
import { GenreService } from "../../services/genre.service";
import { Movie } from "../../models/movie";
import { Genre } from "../../models/genre";
import { ExtraIds } from "../../models/personextraid";

@Component({
  selector: 'app-personinfo',
  templateUrl: './personinfo.component.html',
  styleUrls: ['./personinfo.component.css']
})
export class PersoninfoComponent implements OnInit {
  personId: number;
  personInfo: PersonInfo;
  movieCredit: Movie[];
  allGenres: Genre[];
  movieGenre: string[];
  extraids:ExtraIds;
  constructor(private peopleService: PeopleService, private route: ActivatedRoute, private genreService: GenreService) { }

  ngOnInit() {
    this.getPersonId();
    this.getGenres()
    this.getPersonDetails().subscribe();
    this.getpersonCredits().subscribe();
    this.getPersonExtraIds();
  }

  getPersonId() {
    this.route.params.subscribe((param: Params) => {
      this.personId = param['id'];
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

  getPersonDetails() {
    return this.peopleService.getpersonInfo(this.personId)
      .map(personinfo => {
        this.personInfo = personinfo;
      });
  }

  getpersonCredits() {
    return this.peopleService.getpersonCredits(this.personId)
      .map(personCrew => {
        this.movieCredit = personCrew.cast;
      });
  }

  getPersonExtraIds() {
    this.peopleService.getpersonExtraId(this.personId).subscribe(extra => {
      this.extraids = extra;
    });
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
