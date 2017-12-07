import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { GameDetailsComponent } from './games/game-details/game-details.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'games', component: GameListComponent, children: [
    {
      path: ':id', component: GameDetailsComponent
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
