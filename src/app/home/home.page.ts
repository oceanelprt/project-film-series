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

  mesFavorisAffiches = false;

  keyFavoris = 'mesFavoris';
  favoris: any[] = [];

  // http
  constructor(private http: HttpClient) {}

  onRecherche(): void {
    this.mesFavorisAffiches = false;
    let val = this.nomFilm;
    // préparation de l'url pour chercher les films sur l'API
    let url ='http://www.omdbapi.com/?apikey=efdc2275&s='+val;

    // remise à 0 des films
    this.films=[];
    
    // appel API
    this.http.get<any>(url).subscribe(
      (film)=> { // JSON
        // Récupération des films dans le tableau films
        let films = film.Search;   
        let filmsFavoris = <any[]> JSON.parse(localStorage.getItem(this.keyFavoris));
        

        for (let f of films) {
          f['favoris'] = false;
          if (filmsFavoris != null) {
            for (let favoris of filmsFavoris) {
              f['favoris'] = favoris['imdbID'] == f['imdbID'] ? true : false;
            }
          }
          
        }

        this.films = films
      }
    );
  }

  onAjoutFavoris(indiceFilm: number): void {
    this.mesFavorisAffiches = true;

    let filmFavoris = this.films[indiceFilm];
    filmFavoris['favoris'] = true;

    this.favoris.push(filmFavoris);

    // suppression des doublons
    this.favoris = this.favoris.filter((value, index) => this.favoris.indexOf(value) === index)

    // envoyer les favoris sur le localstorage
    localStorage.setItem(this.keyFavoris, JSON.stringify(this.favoris));
  } 

  onAfficheFavoris(): void {
    this.mesFavorisAffiches = true;
    // remise à 0 des films affichés
    this.films = [];

    // récupérer les favoris sur le localstorage
    this.favoris = <any[]> JSON.parse(localStorage.getItem(this.keyFavoris));
    this.films = this.favoris;
  }

  onEnleveFavoris(indiceFilm: number): void {
    // visage des favoris dans le localStorage
    localStorage.clear();

    // suppression du favoris de la liste des favoris
    this.favoris.splice(indiceFilm, 1);

    // envoyer les favoris sur le localstorage
    localStorage.setItem(this.keyFavoris, JSON.stringify(this.favoris))
  }
}
