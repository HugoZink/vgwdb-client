import { Component, OnInit, Input } from '@angular/core';
import { Developer } from '../../../../models/developer.model';

@Component({
  selector: 'app-developer-item',
  templateUrl: './developer-item.component.html',
  styleUrls: ['./developer-item.component.css']
})
export class DeveloperItemComponent implements OnInit {

  @Input() developer: Developer;

  id: number;
  name: string;

  constructor() { }

  ngOnInit() {
    this.id = this.developer.id;
    this.name = this.developer.name;
  }

}
