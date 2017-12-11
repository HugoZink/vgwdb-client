import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeaponService } from '../../../services/weapon.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Weapon } from '../../../models/weapon.model';

@Component({
  selector: 'app-weapon-details',
  templateUrl: './weapon-details.component.html',
  styleUrls: ['./weapon-details.component.css']
})
export class WeaponDetailsComponent implements OnInit, OnDestroy {

  weapon: Weapon;

  subscription: Subscription;

  constructor(private weaponService: WeaponService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params
    .subscribe(
      (params: Params) => {
        try{
          const id = params['id'];
          this.weapon = this.weaponService.getWeapon(id);
        }
        catch(e){
          this.onReload();
        }
      }
    );
  }

  ngOnDestroy() {

  }

  onReload() {
    this.router.navigate(['/weapons']);
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
