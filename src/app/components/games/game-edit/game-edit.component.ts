import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from '../../../models/game.model';
import { Developer } from '../../../models/developer.model';
import { Subscription } from 'rxjs/Subscription';
import { GameService } from '../../../services/game.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DeveloperService } from '../../../services/developer.service';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit, OnDestroy {

  //If true, the user is updating a game. If false, the user is creating a new one.
  editMode: boolean = false;

  game: Game;

  developers: Developer[];

  subscription: Subscription;

  developerSubscription: Subscription;

  //Temporary variable for developer selection.
  developerId: number;

  constructor(
    private gameService: GameService,
    private developerService: DeveloperService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.subscription = this.route.params
    .subscribe(
      (params: Params) => {
        try{
          const id = params['id'];

          if(!id){
            this.editMode = false;
            this.game = new Game();
            this.game.weapons = [];
          }
          else {
            this.editMode = true;
            //Copy object, to prevent the form from changing the original prematurely
            this.game = JSON.parse(JSON.stringify(this.gameService.getGame(id)))
            this.developerId = this.game.developer.id;
          }
        }
        catch(e){
          this.onReload();
        }
      }
    );

    this.developers = this.developerService.getDevelopers();

    //Subscribe to changes in the developer dataset
    this.developerSubscription = this.developerService.dataSub.subscribe(
      (data: Developer[]) => { this.developers = data; }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.developerSubscription.unsubscribe();
  }

  onReload() {
    this.router.navigate(['/developers']);
  }

  onSaveChanges() {
    
    //Get developer name from ID
    let developer = this.developerService.getDeveloper(this.developerId);
    this.game.developer = {id: developer.id, name: developer.name}

    if(this.editMode) {
      this.gameService.updateGame(this.game);
      this.router.navigate(['/games/' + this.game.id]);
    }
    else {
      this.gameService.createGame(this.game);
      this.router.navigate(['/games']);
    }
  }

  onCancel() {
    if(this.editMode) {
      this.router.navigate(['/games/' + this.game.id]);
    }
    else {
      this.router.navigate(['/games']);
    }
  }

}
