import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { VideoEffects } from '../redux/effects/video.effects';
import { customVideoReducers } from '../redux/reducers/custom-video.reducer';
import { reducers } from '../redux/reducers/video.reducer';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './components/card/card.component';
import { ItemStatisticsComponent } from './components/item-statistics/item-statistics.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CardListComponent } from './pages/card-list/card-list.component';
import { DetailedInformationComponent } from './pages/detailed-information/detailed-information.component';
import { ListComponent } from './pages/list/list.component';
import { YoutubeRoutingModule } from './youtube-routing.module';

@NgModule({
  declarations: [
    CardComponent,
    CardListComponent,
    DetailedInformationComponent,
    ItemStatisticsComponent,
    PaginationComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    YoutubeRoutingModule,
    RouterModule,
    SharedModule,
    MatPaginatorModule,
    StoreModule.forFeature('video', reducers),
    StoreModule.forFeature('customVideo', customVideoReducers),
    EffectsModule.forFeature([VideoEffects])
  ],
  exports: [CardListComponent, DetailedInformationComponent, CardComponent]
})
export class YoutubeModule {}
