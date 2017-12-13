import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GameListComponent } from './components/games/game-list/game-list.component';
import { GameDetailsComponent } from './components/games/game-details/game-details.component';
import { WeaponListComponent } from './components/weapons/weapon-list/weapon-list.component';
import { WeaponDetailsComponent } from './components/weapons/weapon-details/weapon-details.component';
import { WeaponEditComponent } from './components/weapons/weapon-edit/weapon-edit.component';
import { ManufacturerListComponent } from './components/manufacturers/manufacturer-list/manufacturer-list.component';
import { ManufacturerDetailsComponent } from './components/manufacturers/manufacturer-details/manufacturer-details.component';
import { ManufacturerEditComponent } from './components/manufacturers/manufacturer-edit/manufacturer-edit.component';
import { DeveloperListComponent } from './components/developers/developer-list/developer-list.component';
import { DeveloperDetailsComponent } from './components/developers/developer-details/developer-details.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'games', component: GameListComponent, children: [
    {
      path: ':id', component: GameDetailsComponent
    }
  ]},
  { path: 'developers', component: DeveloperListComponent, children: [
    {
      path: ':id', component: DeveloperDetailsComponent
    },
    {
      path: ':id/edit', component: ManufacturerEditComponent
    }
  ]},
  { path: 'weapons', component: WeaponListComponent, children: [
    {
      path: 'new', component: WeaponEditComponent
    },
    {
      path: ':id', component: WeaponDetailsComponent
    },
    {
      path: ':id/edit', component: WeaponEditComponent
    }
  ]},
  { path: 'manufacturers', component: ManufacturerListComponent, children: [
    {
      path: ':id', component: ManufacturerDetailsComponent
    },
    {
      path: ':id/edit', component: ManufacturerEditComponent
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
