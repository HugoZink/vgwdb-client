import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Weapon } from '../models/weapon.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WeaponService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/weapons'; // URL to web api
  private weapons: Weapon[] = [];

  //This Subject will pass on data to its subscribers when the data changes.
  dataSub: Subject<Weapon[]>;

  constructor(private http: Http, private httpClient: HttpClient) {
    this.dataSub = new Subject();
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
        
        //Notify observers that the data has changed
        this.dataSub.next(this.weapons);
      }
    );
  }

  public createWeapon(weapon: Weapon) {

    this.httpClient.post<Weapon>(this.serverUrl, weapon.toObject())
    .subscribe(
      (weapon: Weapon) => {
        this.weapons.push(weapon);

        //Notify observers that the data has changed
        this.dataSub.next(this.weapons);
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

    this.dataSub.next(this.weapons);
  }

  public deleteWeapon(weapon: Weapon) {
    let url = this.serverUrl + '/' + weapon.id;

    this.httpClient.delete(url)
    .subscribe(() => {
      //Delete weapon from array
      let index = this.weapons.findIndex(w => w.id == weapon.id);

      this.weapons.splice(index, 1);

      this.dataSub.next(this.weapons);
    });
  }

  //
  //
  //
  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}
