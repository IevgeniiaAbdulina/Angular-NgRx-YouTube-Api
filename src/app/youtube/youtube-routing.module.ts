import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardListComponent } from './pages/card-list/card-list.component';
import { DetailedInformationComponent } from './pages/detailed-information/detailed-information.component';

const routes: Routes = [
  { path: '', component: CardListComponent },
  { path: ':id', component: DetailedInformationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YoutubeRoutingModule {}
