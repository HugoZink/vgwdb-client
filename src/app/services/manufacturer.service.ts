import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Manufacturer } from '../models/manufacturer.model';

@Injectable()
export class ManufacturerService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/manufacturers'; // URL to web api
  private manufacturers: Manufacturer[] = [];

  constructor(private http: Http, private httpClient: HttpClient) {
    this.fetchManufacturers();
  }

  public getManufacturers() : Manufacturer[] {
    return this.manufacturers;
  }

  public getManufacturer(id: number) : Manufacturer {
    for(let manufacturer of this.manufacturers){
      if(manufacturer.id == id)
      {
        return manufacturer;
      }
    }
  }

  private fetchManufacturers(){
    console.log('manufacturers ophalen van server');
    this.httpClient.get<Manufacturer[]>(this.serverUrl, {
      observe: 'body',
      responseType: 'json'
    })
    .subscribe(
      (manufacturers: Manufacturer[]) => {
        this.manufacturers = manufacturers;
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
