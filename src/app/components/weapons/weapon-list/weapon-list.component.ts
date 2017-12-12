import { Component, OnInit, OnDestroy } from '@angular/core';
import { Weapon } from '../../../models/weapon.model';
import { WeaponService } from '../../../services/weapon.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-weapon-list',
  templateUrl: './weapon-list.component.html',
  styleUrls: ['./weapon-list.component.css']
})
export class WeaponListComponent implements OnInit {

  weapons: Weapon[];

  constructor(private weaponService: WeaponService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() : void {
    this.weapons = this.weaponService.getWeapons();

    this.weaponService.dataSub.subscribe(
      (data: Weapon[]) => { this.weapons = data; }
    );
  }

  ngOnDestroy() : void {
    this.weaponService.dataSub.unsubscribe();
  }

  onAddWeapon() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
