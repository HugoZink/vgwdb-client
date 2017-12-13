import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from '../../../models/game.model';
import { Subscription } from 'rxjs/Subscription';
import { GameService } from '../../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Params } from '@angular/router';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit, OnDestroy {

  game: Game;

  subscription: Subscription;

  constructor(private gameService: GameService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe(
        (params: Params) => {
          try{
            const id = params['id'];
            this.game = this.gameService.getGame(id);
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
    this.router.navigate(['/games']);
  }

}
