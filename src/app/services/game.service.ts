import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Game } from '../models/game.model';

@Injectable()
export class GameService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/games'; // URL to web api
  private games: Game[] = [];

  constructor(private http: Http, private httpClient: HttpClient) {
    this.fetchGames();
  }

  /*
  public getGames(): Promise<Game[]> {
    console.log('games ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as Game[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }
  */

  public getGames() : Game[] {
    return this.games;
  }

  public getGame(id: number) : Game {
    for(let game of this.games){
      if(game.id == id)
      {
        return game;
      }
    }
  }

  private fetchGames(){
    console.log('games ophalen van server');
    this.httpClient.get<Game[]>(this.serverUrl, {
      observe: 'body',
      responseType: 'json'
    })
    .subscribe(
      (games: Game[]) => {
        this.games = games;
      }
    );
  }

  //
  //
  //
  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}
