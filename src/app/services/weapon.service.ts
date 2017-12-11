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
      (weapons: Weapon[]) => {
        this.weapons = weapons;
      }
    );
  }

  public updateWeapon(weapon: Weapon) {

    let url = this.serverUrl + '/' + weapon.id;

    this.httpClient.put(url, weapon, {
      observe: 'body',
      responseType: 'json'
    })
    .subscribe(
      (weapon: Weapon) => {
        this.onPutResponse(weapon);
      }
    );
  }

  private onPutResponse(weapon: Weapon) {
    //Replace weapon with the one we got from the server
    let index = this.weapons.findIndex(w => w.id == weapon.id);

    this.weapons[index] = weapon;
  }

  //
  //
  //
  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}
