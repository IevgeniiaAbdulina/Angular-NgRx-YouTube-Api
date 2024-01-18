import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Output
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FilteringByKeyWordsPipe } from 'src/app/shared/pipes/filtering-by-key-words.pipe';

import { VideoDataService } from '../../services/video-data.service';
import { CardListComponent } from './card-list.component';

@Component({
  selector: 'app-list',
  template: ''
})
class MockAppListComponent {
  @Output() appList = new EventEmitter();
}

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardListComponent,
        FilteringByKeyWordsPipe,
        MockAppListComponent
      ],
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({ initialState: {} }), VideoDataService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
