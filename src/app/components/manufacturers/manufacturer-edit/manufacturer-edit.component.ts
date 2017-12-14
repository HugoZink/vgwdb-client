import { Component, OnInit, OnDestroy } from '@angular/core';
import { Manufacturer } from '../../../models/manufacturer.model';
import { Subscription } from 'rxjs/Subscription';
import { ManufacturerService } from '../../../services/manufacturer.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-manufacturer-edit',
  templateUrl: './manufacturer-edit.component.html',
  styleUrls: ['./manufacturer-edit.component.css']
})
export class ManufacturerEditComponent implements OnInit, OnDestroy {

  //If true, the user is updating a manufacturer. If false, the user is creating a new one.
  editMode: boolean = false;
  
  manufacturer: Manufacturer;

  subscription: Subscription;

  constructor(
    private manufacturerService: ManufacturerService,
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
            this.manufacturer = new Manufacturer();
            this.manufacturer.weapons = [];
          }
          else {
            this.editMode = true;
            //Copy object, to prevent the form from changing the original prematurely
            this.manufacturer = JSON.parse(JSON.stringify(this.manufacturerService.getManufacturer(id)))
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
    this.router.navigate(['/manufacturers']);
  }

  onSaveChanges() {
    if(this.editMode) {
      this.manufacturerService.updateManufacturer(this.manufacturer);
      this.router.navigate(['/manufacturers/' + this.manufacturer.id]);
    }
    else {
      this.manufacturerService.createManufacturer(this.manufacturer);
      this.router.navigate(['/manufacturers']);
    }
  }

  onCancel() {
    if(this.editMode) {
      this.router.navigate(['/manufacturers/' + this.manufacturer.id]);
    }
    else {
      this.router.navigate(['/manufacturers']);
    }
  }
}
