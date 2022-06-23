import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Film } from '../models/Films';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  nomFilm = "";
  films:Film[]=[];
  nbMaxFilms:number = 10;

  // http
  constructor(private http:HttpClient) {}

  onRecherche(){
    let val = this.nomFilm;
    let url ='http://www.omdbapi.com/?apikey=efdc2275&s='+val;
    this.films=[];
    console.log(url);
    
    this.http.get<any>(url).subscribe(
      (film)=> { // JSON
        console.log(film)
        for (let i = 0; i < 10; i++) {
          let newFilm = new Film(film.Search[i].Title, film.Search[i].Year, film.Search[i].Poster);
          this.films.push(newFilm);
        }
      }
    );
  }
}
