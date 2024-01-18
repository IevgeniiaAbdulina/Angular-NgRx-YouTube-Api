import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getVideoDataAction } from 'src/app/redux/actions/video-api.actions';

import { SessionData } from '../../services/session-data';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  pageIndex = 1;

  constructor(private store: Store) {}

  previousPageHandler(): void {
    if (this.pageIndex > 1) {
      this.pageIndex -= 1;
    }

    this.store.dispatch(
      getVideoDataAction({
        searchValue: SessionData.queryTerm,
        pageToken: SessionData.prevPageToken
      })
    );
  }

  nextPageHandler(): void {
    this.pageIndex += 1;

    this.store.dispatch(
      getVideoDataAction({
        searchValue: SessionData.queryTerm,
        pageToken: SessionData.nextPageToken
      })
    );
  }
}
