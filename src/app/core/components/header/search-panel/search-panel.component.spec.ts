import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { CustomVideoService } from 'src/app/admin/services/custom-video.service';
import { VideoDataService } from 'src/app/youtube/services/video-data.service';

import { SearchPanelComponent } from './search-panel.component';

describe('SearchPanelComponent', () => {
  let component: SearchPanelComponent;
  let fixture: ComponentFixture<SearchPanelComponent>;
  let input: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPanelComponent],
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({}), VideoDataService, CustomVideoService]
    });
    fixture = TestBed.createComponent(SearchPanelComponent);
    component = fixture.componentInstance;
    input = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get video data when start to search', () => {
    input.value = 'angular';
    const componentToSpy = jest.spyOn(component, 'searchButtonHandler');
    const button = fixture.debugElement.query(By.css('#search-button'));
    button.nativeElement.click();

    expect(componentToSpy).toHaveBeenCalled();
  });

  it('should not get video data when the search field is empty', () => {
    input.value = '';
    const componentToSpy = jest.spyOn(component, 'searchButtonHandler');
    const button = fixture.debugElement.query(By.css('#search-button'));
    button.nativeElement.click();

    expect(componentToSpy).toHaveBeenCalled();
  });

  it('should clear input field when the button <claer> is clecked', () => {
    input.value = 'angular';
    fixture.debugElement.query(By.css('#clear-button')).nativeElement.click();

    expect(input.value).toEqual('');
  });
});
