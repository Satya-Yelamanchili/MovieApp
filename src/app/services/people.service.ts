import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Constants } from "../constants";

@Injectable()
export class PeopleService {
  personDetailsUrl: string;
  personCredit:string;
  personExtraUrl:string;
  constructor(private http: Http) {
  }

  getpersonInfo(personId: number) {
    this.personDetailsUrl = Constants.baseApiUrl + Constants.personinfo.replace("{person_id}", personId.toString()) + Constants.apiKey;
    return this.http.get(this.personDetailsUrl).map(res => res.json());
  }

  getpersonCredits(personId: number) {
    this.personDetailsUrl = Constants.baseApiUrl + Constants.personMovieCredits.replace("{person_id}", personId.toString()) + Constants.apiKey;
    return this.http.get(this.personDetailsUrl).map(res => res.json());
  }

  getpersonExtraId(personId: number){
    this.personExtraUrl = Constants.baseApiUrl + Constants.personExtraId.replace("{person_id}",personId.toString())+Constants.apiKey;
    return this.http.get(this.personExtraUrl).map(res => res.json()||{});
  }

}
