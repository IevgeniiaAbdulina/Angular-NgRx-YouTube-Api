import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { YoutubeModule } from '../youtube/youtube.module';
import { FavoriteComponent } from './favorite.component';
import { FavoriteRoutingModule } from './favorite-routing.module';

@NgModule({
  declarations: [FavoriteComponent],
  imports: [CommonModule, FavoriteRoutingModule, YoutubeModule],
  exports: [FavoriteComponent]
})
export class FavoriteModule {}
