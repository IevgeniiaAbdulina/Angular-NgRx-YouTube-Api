import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ButtonComponent } from './components/button/button.component';
import { CardBorderColorDirective } from './directives/card-border-color.directive';
import { FilteringByKeyWordsPipe } from './pipes/filtering-by-key-words.pipe';
import { ShortNumberPipe } from './pipes/short-number.pipe';

@NgModule({
  declarations: [
    ButtonComponent,
    CardBorderColorDirective,
    FilteringByKeyWordsPipe,
    ShortNumberPipe
  ],
  imports: [CommonModule, MatIconModule],
  exports: [
    MatIconModule,
    ButtonComponent,
    CardBorderColorDirective,
    FilteringByKeyWordsPipe,
    ShortNumberPipe
  ]
})
export class SharedModule {}
