import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Developer } from '../../../models/developer.model';
import { DeveloperService } from '../../../services/developer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-developer-list',
  templateUrl: './developer-list.component.html',
  styleUrls: ['./developer-list.component.css']
})
export class DeveloperListComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  developers: Developer[];

  constructor(private developerService: DeveloperService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.developers = this.developerService.getDevelopers();

    this.subscription = this.developerService.dataSub.subscribe(
      (data: Developer[]) => { this.developers = data; }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddDeveloper() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
