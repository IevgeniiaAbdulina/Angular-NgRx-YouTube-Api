import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailedInformationComponent } from '../youtube/pages/detailed-information/detailed-information.component';
import { FavoriteComponent } from './favorite.component';

const routes: Routes = [
  { path: '', component: FavoriteComponent },
  { path: ':id', component: DetailedInformationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoriteRoutingModule {}
