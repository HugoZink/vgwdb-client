import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Manufacturer } from '../models/manufacturer.model';
import { Subject } from 'rxjs/Subject';

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

  public createManufacturer(manufacturer: Manufacturer) {
    this.httpClient.post(this.serverUrl, manufacturer.toObject())
    .subscribe(
      (manufacturer: Manufacturer) => {
        this.manufacturers.push(manufacturer);

        //Notify observers that the data has changed
        this.dataSub.next(this.manufacturers);
      }
    );
  }

  public updateManufacturer(manufacturer: Manufacturer) {
    let url = this.serverUrl + '/' + manufacturer.id;

    this.httpClient.put(url, manufacturer)
    .subscribe(
      (manufacturer: Manufacturer) => {
        this.onPutResponse(manufacturer);
      }
    );
  }

  private onPutResponse(manufacturer: Manufacturer) {
    //Replace manufacturer with the one we got from the server
    let index = this.manufacturers.findIndex(m => m.id == manufacturer.id);

    this.manufacturers[index] = manufacturer;

    this.dataSub.next(this.manufacturers);
  }

  public deleteManufacturer(manufacturer: Manufacturer) {
    let url = this.serverUrl + '/' + manufacturer.id;

    this.httpClient.delete(url)
    .subscribe(
      () => {
        //Delete manufacturer from array
        let index = this.manufacturers.findIndex(m => m.id == manufacturer.id);
      
        this.manufacturers.splice(index, 1);
  
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
