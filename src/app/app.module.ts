import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from "@angular/router";

import { MoviesService } from "./services/movies.service";
import { GenreService } from "./services/genre.service";
import { PeopleService } from "./services/people.service";

import { SearchComponent } from './components/search/search.component';
import { PeopleComponent } from './components/people/people.component';
import { MovieinfoComponent } from './components/movieinfo/movieinfo.component';
import { MoviespopularComponent } from './components/moviespopular/moviespopular.component';
import { PersoninfoComponent } from './components/personinfo/personinfo.component';
import { MovielistDirective } from './directives/movielist.directive';
import { MovielistComponent } from './components/movielist/movielist.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

const approutes: Routes = [
    {path:'', component: HomeComponent },
    {path:'movies', component: MoviespopularComponent},
    {path:'movieinfo/:id', component: MovieinfoComponent },
    {path:'people', component: PeopleComponent },
    {path:'personinfo/:id', component: PersoninfoComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PeopleComponent,
    MovieinfoComponent,
    MoviespopularComponent,
    PersoninfoComponent,
    MovielistDirective,
    MovielistComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(approutes),
  ],
  providers: [MoviesService,GenreService,PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
