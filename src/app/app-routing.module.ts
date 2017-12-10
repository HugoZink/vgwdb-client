import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GameListComponent } from './components/games/game-list/game-list.component';
import { GameDetailsComponent } from './components/games/game-details/game-details.component';
import { WeaponListComponent } from './components/weapons/weapon-list/weapon-list.component';
import { WeaponDetailsComponent } from './components/weapons/weapon-details/weapon-details.component';
import { WeaponEditComponent } from './components/weapons/weapon-edit/weapon-edit.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'games', component: GameListComponent, children: [
    {
      path: ':id', component: GameDetailsComponent
    }
  ]},
  { path: 'weapons', component: WeaponListComponent, children: [
    {
      path: ':id', component: WeaponDetailsComponent
    },
    {
      path: ':id/edit', component: WeaponEditComponent
    }
  ]},
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
