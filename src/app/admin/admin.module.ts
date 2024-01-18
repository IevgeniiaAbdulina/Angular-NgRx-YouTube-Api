import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { VideoEffects } from '../redux/effects/video.effects';
import { customVideoReducers } from '../redux/reducers/custom-video.reducer';
import { SharedModule } from '../shared/shared.module';
import { AdminPageComponent } from './admin-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ObjToArrayPipe } from './pipes/obj-to-array.pipe';

@NgModule({
  declarations: [AdminPageComponent, ObjToArrayPipe],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('customVideo', customVideoReducers),
    EffectsModule.forFeature([VideoEffects])
  ]
})
export class AdminModule {}
