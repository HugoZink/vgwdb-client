import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeveloperService } from '../../../services/developer.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Developer } from '../../../models/developer.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-developer-details',
  templateUrl: './developer-details.component.html',
  styleUrls: ['./developer-details.component.css']
})
export class DeveloperDetailsComponent implements OnInit, OnDestroy {

  developer: Developer;
  
  subscription: Subscription;

  constructor(private developerService: DeveloperService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe(
        (params: Params) => {
          try{
            const id = params['id'];
            this.developer = this.developerService.getDeveloper(id);
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

}
