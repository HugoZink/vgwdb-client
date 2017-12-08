import { Component, OnInit, Input } from '@angular/core';
import { Weapon } from '../../../../models/weapon.model';

@Component({
  selector: 'app-weapon-item',
  templateUrl: './weapon-item.component.html',
  styleUrls: ['./weapon-item.component.css']
})
export class WeaponItemComponent implements OnInit {

  @Input() weapon: Weapon;

  id: number;
  name: string;

  constructor() { }

  ngOnInit() {
    this.id = this.weapon.id;
    this.name = this.weapon.name;
  }

}
