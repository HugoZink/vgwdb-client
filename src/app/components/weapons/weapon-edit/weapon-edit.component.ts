import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Weapon } from '../../../models/weapon.model';
import { Game } from '../../../models/game.model';
import { WeaponService } from '../../../services/weapon.service';
import { GameService } from '../../../services/game.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup } from '@angular/forms';
import { ManufacturerService } from '../../../services/manufacturer.service';
import { Manufacturer } from '../../../models/manufacturer.model';

@Component({
  selector: 'app-weapon-edit',
  templateUrl: './weapon-edit.component.html',
  styleUrls: ['./weapon-edit.component.css']
})
export class WeaponEditComponent implements OnInit, OnDestroy {

  //If true, the user is updating a weapon. If false, the user is creating a new one.
  editMode: boolean = false;

  weapon: Weapon;

  availableGames: Game[];

  manufacturers: Manufacturer[];

  subscription: Subscription;

  gameSubscription: Subscription;

  manufacturerSubscription: Subscription;

  weaponForm: FormGroup;

  //Temporary variables that are set when adding a game to the weapon.
  gameId: number;
  ingameName: string;

  //Temporary variable for manufacturer selection.
  manufacturerId: number;

  constructor(private weaponService: WeaponService,
    private gameService: GameService,
    private manufacturerService: ManufacturerService,
    private route: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {

    this.subscription = this.route.params
      .subscribe(
        (params: Params) => {
          try{
            const id = params['id'];

            if(!id){
              this.editMode = false;
              this.weapon = new Weapon();
              this.weapon.games = [];
            }
            else {
              this.editMode = true;
              //Copy object, to prevent the form from changing the original prematurely
              this.weapon = JSON.parse(JSON.stringify(this.weaponService.getWeapon(id)))
              this.manufacturerId = this.weapon.manufacturer.id;
            }
          }
          catch(e){
            this.onReload();
          }
        }
      );

      this.updateAvailableGames();

      //Subscribe to changes in the game dataset
      this.gameSubscription = this.gameService.dataSub.subscribe(
        (data: Game[]) => { this.updateAvailableGames(); }
      );

      this.manufacturers = this.manufacturerService.getManufacturers();

      //Subscribe to changes in the manufacturer dataset
      this.manufacturerSubscription = this.manufacturerService.dataSub.subscribe(
        (data: Manufacturer[]) => { this.manufacturers = data; }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.gameSubscription.unsubscribe();
    this.manufacturerSubscription.unsubscribe();
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

    //Get manufacturer name from ID
    let manufacturer = this.manufacturerService.getManufacturer(this.manufacturerId);
    this.weapon.manufacturer = {id: manufacturer.id, name: manufacturer.name}

    if(this.editMode) {
      this.weaponService.updateWeapon(this.weapon);
      this.router.navigate(['/weapons/' + this.weapon.id]);
    }
    else {
      this.weaponService.createWeapon(this.weapon);
      this.router.navigate(['/weapons']);
    }
  }

  onCancel() {
    this.router.navigate(['/weapons/' + this.weapon.id]);
  }

}
