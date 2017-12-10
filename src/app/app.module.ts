import { GameService } from './services/game.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { GameListComponent } from './components/games/game-list/game-list.component';
import { GameItemComponent } from './components/games/game-list/game-item/game-item.component';
import { GameDetailsComponent } from './components/games/game-details/game-details.component';
import { WeaponListComponent } from './components/weapons/weapon-list/weapon-list.component';
import { WeaponDetailsComponent } from './components/weapons/weapon-details/weapon-details.component';
import { WeaponItemComponent } from './components/weapons/weapon-list/weapon-item/weapon-item.component';
import { WeaponService } from './services/weapon.service';
import { WeaponEditComponent } from './components/weapons/weapon-edit/weapon-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    GameListComponent,
    GameItemComponent,
    GameDetailsComponent,
    WeaponListComponent,
    WeaponDetailsComponent,
    WeaponItemComponent,
    WeaponEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    GameService,
    WeaponService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
