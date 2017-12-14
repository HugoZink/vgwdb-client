import { Component, OnInit, OnDestroy } from '@angular/core';
import { Manufacturer } from '../../../models/manufacturer.model';
import { ManufacturerService } from '../../../services/manufacturer.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.css']
})
export class ManufacturerListComponent implements OnInit, OnDestroy {

  manufacturers: Manufacturer[];

  subscription: Subscription;

  constructor(private manufacturerService: ManufacturerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.manufacturers = this.manufacturerService.getManufacturers();

    //Subscribe to changes in the data set
    this.subscription = this.manufacturerService.dataSub.subscribe(
      (data: Manufacturer[]) => { this.manufacturers = data; }
    );
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

  onAddManufacturer() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
