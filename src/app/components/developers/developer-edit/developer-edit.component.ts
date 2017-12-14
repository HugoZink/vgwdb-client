import { Component, OnInit, OnDestroy } from '@angular/core';
import { Developer } from '../../../models/developer.model';
import { Subscription } from 'rxjs/Subscription';
import { DeveloperService } from '../../../services/developer.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-developer-edit',
  templateUrl: './developer-edit.component.html',
  styleUrls: ['./developer-edit.component.css']
})
export class DeveloperEditComponent implements OnInit, OnDestroy {

  //If true, the user is updating a developer. If false, the user is creating a new one.
  editMode: boolean = false;
  
  developer: Developer;

  subscription: Subscription;

  constructor(
    private developerService: DeveloperService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.route.params
    .subscribe(
      (params: Params) => {
        try{
          const id = params['id'];

          if(!id){
            this.editMode = false;
            this.developer = new Developer();
            this.developer.games = [];
          }
          else {
            this.editMode = true;
            //Copy object, to prevent the form from changing the original prematurely
            this.developer = JSON.parse(JSON.stringify(this.developerService.getDeveloper(id)))
          }
        }
        catch(e){
          this.onReload();
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onReload() {
    this.router.navigate(['/developers']);
  }

  onSaveChanges() {
    if(this.editMode) {
      this.developerService.updateDeveloper(this.developer);
      this.router.navigate(['/developers/' + this.developer.id]);
    }
    else {
      this.developerService.createDeveloper(this.developer);
      this.router.navigate(['/developers']);
    }
  }

  onCancel() {
    if(this.editMode) {
      this.router.navigate(['/developers/' + this.developer.id]);
    }
    else {
      this.router.navigate(['/developers']);
    }
  }

}
