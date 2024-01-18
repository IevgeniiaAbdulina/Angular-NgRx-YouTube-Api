import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { VideoDataService } from 'src/app/youtube/services/video-data.service';

import { getVideoListSuccess } from '../../actions/video-api.actions';
import { videoListMock } from '../../mocks/video.mocks';
import { VideoEffects } from '../video.effects';

class MockVideoDataService {
  getVideoList() {
    return of([]);
  }
}

describe('Video Effects', () => {
  let actions$: Actions;
  let effects$: VideoEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState: {} }),
        provideMockActions(() => actions$),
        VideoEffects,
        {
          provide: VideoDataService,
          useClass: MockVideoDataService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    actions$ = TestBed.inject(Actions);
    effects$ = TestBed.inject(VideoEffects);
  });

  it('should be created', () => {
    expect(effects$).toBeTruthy();
  });

  it('should fetch youtube API video list ', () => {
    actions$ = of({ type: '[Video List] Get Video List' });
    effects$.getVideoData$.subscribe(action => {
      expect(action).toEqual(getVideoListSuccess({ videoList: videoListMock }));
    });
  });
});
