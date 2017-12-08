import { Component, OnInit, OnDestroy } from '@angular/core';
import { Weapon } from '../../../models/weapon.model';
import { WeaponService } from '../../../services/weapon.service';

@Component({
  selector: 'app-weapon-list',
  templateUrl: './weapon-list.component.html',
  styleUrls: ['./weapon-list.component.css']
})
export class WeaponListComponent implements OnInit {

  private weapons: Weapon[];

  constructor(private weaponService: WeaponService) { }

  ngOnInit() : void {
    this.weapons = this.weaponService.getWeapons();
  }

  ngOnDestroy() : void {
    
  }

}
