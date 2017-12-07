import { UserService } from './services/user.service';
import { GameService } from './services/game.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { GameItemComponent } from './games/game-list/game-item/game-item.component';
import { HttpClientModule } from '@angular/common/http';
import { GameDetailsComponent } from './games/game-details/game-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    GameListComponent,
    GameItemComponent,
    GameDetailsComponent,
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
    UserService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
