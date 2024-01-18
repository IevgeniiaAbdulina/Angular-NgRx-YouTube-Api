import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchPanelComponent } from './components/header/search-panel/search-panel.component';
import { SettingsComponent } from './components/header/settings-panel/settings.component';
import { UserPanelComponent } from './components/header/user-panel/user-panel.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent,
    UserPanelComponent,
    SearchPanelComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    SharedModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [HeaderComponent, PageNotFoundComponent, FooterComponent]
})
export class CoreModule {}
