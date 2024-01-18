import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShortNumberPipe } from 'src/app/shared/pipes/short-number.pipe';

import { ItemStatisticsComponent } from './item-statistics.component';

describe('ItemStatisticsComponent', () => {
  let component: ItemStatisticsComponent;
  let fixture: ComponentFixture<ItemStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemStatisticsComponent, ShortNumberPipe]
    });
    fixture = TestBed.createComponent(ItemStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
