import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  nomFilm: string = "";
  films: any[] = [];
  nbMaxFilms: number = 10;

  keyFavoris = 'mesFavoris';
  favoris: any[] = [];

  // http
  constructor(private http: HttpClient) {}

  onRecherche(): void {
    let val = this.nomFilm;
    // préparation de l'url pour chercher les films sur l'API
    let url ='http://www.omdbapi.com/?apikey=efdc2275&s='+val;

    // remise à 0 des films
    this.films=[];
    
    // appel API
    this.http.get<any>(url).subscribe(
      (film)=> { // JSON
        // Récupération des films dans le tableau films
       
        this.films = film['Search'];
      }
    );
  }

  onAjoutFavoris(indiceFilm: number): void {
    this.favoris.push(this.films[indiceFilm]);

    // suppression des doublons
    this.favoris = this.favoris.filter((value, index) => this.favoris.indexOf(value) === index)

    // envoyer les favoris sur le localstorage
    localStorage.setItem(this.keyFavoris, JSON.stringify(this.favoris));
  } 

  onAfficheFavoris(): void {
    // remise à 0 des films affichés
    this.films = [];
    
    // récupérer les favoris sur le localstorage
    this.favoris = <any[]> JSON.parse(localStorage.getItem(this.keyFavoris))
    this.films = this.favoris;
    console.log(this.favoris);
  }
}
