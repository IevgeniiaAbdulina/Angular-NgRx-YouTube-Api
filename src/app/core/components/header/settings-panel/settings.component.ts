import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VideoDataService } from 'src/app/youtube/services/video-data.service';

import { SortingService } from '../../../../youtube/services/sorting.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  isSortPanelVisible? = false;
  isSortedByDate = false;
  isSortedByViews = false;

  sortingForm = new FormGroup({
    sortingText: new FormControl('')
  });

  constructor(
    private sortingService: SortingService,
    private videoDataService: VideoDataService
  ) {}

  panelVisibilityChange(): void {
    this.isSortPanelVisible = !this.isSortPanelVisible;
  }

  sortingByDateHandler(): void {
    this.isSortedByDate = !this.isSortedByDate;
    this.sortingService.sortingByDate(this.isSortedByDate);
  }

  sortingByViewsHandler(): void {
    this.isSortedByViews = !this.isSortedByViews;
    this.sortingService.sortingByViews(this.isSortedByViews);
  }

  filteringByTextHandler(): void {
    const text = this.sortingForm.value.sortingText ?? '';
    this.videoDataService.setFilterKeyWords(text);
  }
}
