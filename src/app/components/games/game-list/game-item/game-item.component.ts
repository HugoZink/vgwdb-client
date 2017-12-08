import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../../../../models/game.model';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css']
})
export class GameItemComponent implements OnInit {

  @Input() game: Game;
  
  id: number;
  name: string;

  constructor() { }

  ngOnInit() {
    this.id = this.game.id;
    this.name = this.game.name;
  }

}
