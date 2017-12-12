import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'Rxjs/Observable';
import { Manufacturer } from '../models/manufacturer.model';
import { Subject } from 'Rxjs/Subject';

@Injectable()
export class ManufacturerService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/manufacturers'; // URL to web api
  private manufacturers: Manufacturer[] = [];

  //This Subject will pass on data to its subscribers when the data changes.
  dataSub: Subject<Manufacturer[]>;

  constructor(private http: Http, private httpClient: HttpClient) {
    this.dataSub = new Subject();
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

        //Notify observers that the data has changed
        this.dataSub.next(this.manufacturers);
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
