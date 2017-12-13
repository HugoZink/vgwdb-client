import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from '../../../models/game.model';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit, OnDestroy {

  //If true, the user is updating a game. If false, the user is creating a new one.
  editMode: boolean = false;

  game: Game;

  //developers: Developer[];

  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

}
