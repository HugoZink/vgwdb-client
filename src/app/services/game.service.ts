import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Game } from '../models/game.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GameService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/games'; // URL to web api
  private games: Game[] = [];

  //This Subject will pass on data to its subscribers when the data changes.
  dataSub: Subject<Game[]>;

  constructor(private http: Http, private httpClient: HttpClient) {
    this.dataSub = new Subject();
    this.fetchGames();
  }

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

        //Notify observers that the data has changed
        this.dataSub.next(this.games);
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
