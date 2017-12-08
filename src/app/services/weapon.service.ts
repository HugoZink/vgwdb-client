import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Weapon } from '../models/weapon.model';

@Injectable()
export class WeaponService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/weapons'; // URL to web api
  private weapons: Weapon[] = [];

  constructor(private http: Http, private httpClient: HttpClient) {
    this.fetchWeapons();
  }

  public getWeapons() : Weapon[] {
    return this.weapons;
  }

  public getWeapon(id: number) : Weapon {
    for(let weapon of this.weapons){
      if(weapon.id == id)
      {
        return weapon;
      }
    }
  }

  private fetchWeapons(){
    console.log('weapons ophalen van server');
    this.httpClient.get<Weapon[]>(this.serverUrl, {
      observe: 'body',
      responseType: 'json'
    })
    .subscribe(
      (games: Weapon[]) => {
        this.weapons = games;
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
