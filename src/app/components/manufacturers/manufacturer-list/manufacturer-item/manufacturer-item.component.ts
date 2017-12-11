import { Component, OnInit, Input } from '@angular/core';
import { Manufacturer } from '../../../../models/manufacturer.model';

@Component({
  selector: 'app-manufacturer-item',
  templateUrl: './manufacturer-item.component.html',
  styleUrls: ['./manufacturer-item.component.css']
})
export class ManufacturerItemComponent implements OnInit {

  @Input() manufacturer: Manufacturer;

  id: number;
  name: string;

  constructor() { }

  ngOnInit() {
    this.id = this.manufacturer.id;
    this.name = this.manufacturer.name;
  }

}
