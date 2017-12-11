import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Weapon } from '../../../models/weapon.model';
import { Game } from '../../../models/game.model';
import { WeaponService } from '../../../services/weapon.service';
import { GameService } from '../../../services/game.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weapon-edit',
  templateUrl: './weapon-edit.component.html',
  styleUrls: ['./weapon-edit.component.css']
})
export class WeaponEditComponent implements OnInit, OnDestroy {

  weapon: Weapon;

  availableGames: Game[];

  subscription: Subscription;

  weaponForm: FormGroup;

  //Temporary variables that are set when adding a game to the weapon.
  gameId: number;
  ingameName: string;

  constructor(private weaponService: WeaponService,
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe(
        (params: Params) => {
          try{
            const id = params['id'];
            this.weapon = this.weaponService.getWeapon(id);
          }
          catch(e){
            this.onReload();
          }
        }
      );

      this.updateAvailableGames();
  }

  ngOnDestroy() {
    
  }

  onReload() {
    this.router.navigate(['/weapons']);
  }

  //Gets all the games from the game service, and filters out games that have already been added to this weapon.
  updateAvailableGames() {

    this.availableGames = [];

    //Collect all game ID's that have already been chosen.
    let takenIds = [];
    for(let game of this.weapon.games) {
      takenIds.push(Number(game.id));
    }

    //Loop over games, and only add those which have not yet been selected.
    for(let game of this.gameService.getGames()){
      if(!takenIds.includes(game.id)) {
        this.availableGames.push(game);
      }
    }

    this.ref.detectChanges();
  }

  onAddGame() {

    let game = this.gameService.getGame(this.gameId);

    this.weapon.games.push({
      id: this.gameId,
      name: game.name,
      ingameName: this.ingameName
    });

    this.updateAvailableGames();
  }

  onDeleteGame(i) {
    this.weapon.games.splice(i, 1);

    this.updateAvailableGames();
  }

  onSaveChanges() {
    this.weaponService.updateWeapon(this.weapon);
    this.router.navigate(['/weapons/' + this.weapon.id]);
  }

}
