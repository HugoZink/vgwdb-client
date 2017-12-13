import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Game } from '../../../models/game.model';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit, OnDestroy {

  games: Game[];

  subscription: Subscription;

  constructor(private gameService : GameService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() : void {
    this.games = this.gameService.getGames();

    this.subscription = this.gameService.dataSub.subscribe(
      (data: Game[]) => { this.games = data; }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddGame() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
