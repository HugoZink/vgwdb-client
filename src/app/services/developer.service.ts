import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Developer } from '../models/developer.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DeveloperService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/developers'; // URL to web api
  private developers: Developer[] = [];

  //This Subject will pass on data to its subscribers when the data changes.
  dataSub: Subject<Developer[]>;

  constructor(private http: Http, private httpClient: HttpClient) {
    this.dataSub = new Subject();
    this.fetchDevelopers();
  }

  public getDevelopers() : Developer[] {
    return this.developers;
  }

  public getDeveloper(id: number) : Developer {
    for(let developer of this.developers){
      if(developer.id == id)
      {
        return developer;
      }
    }
  }

  private fetchDevelopers(){
    console.log('developers ophalen van server');
    this.httpClient.get<Developer[]>(this.serverUrl, {
      observe: 'body',
      responseType: 'json'
    })
    .subscribe(
      (developers: Developer[]) => {
        this.developers = developers;

        //Notify observers that the data has changed
        this.dataSub.next(this.developers);
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
