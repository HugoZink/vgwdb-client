import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Manufacturer } from '../../../models/manufacturer.model';
import { ManufacturerService } from '../../../services/manufacturer.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-manufacturer-details',
  templateUrl: './manufacturer-details.component.html',
  styleUrls: ['./manufacturer-details.component.css']
})
export class ManufacturerDetailsComponent implements OnInit, OnDestroy {

  manufacturer: Manufacturer;

  subscription: Subscription;

  constructor(private manufacturerService: ManufacturerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params
    .subscribe(
      (params: Params) => {
        try{
          const id = params['id'];
          this.manufacturer = this.manufacturerService.getManufacturer(id);
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
    this.router.navigate(['/weapons']);
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete() {
    if(confirm('Are you sure you want to delete this manufacturer?')) {
      this.manufacturerService.deleteManufacturer(this.manufacturer);
      this.router.navigate(['/manufacturers']);
    }
  }
}
