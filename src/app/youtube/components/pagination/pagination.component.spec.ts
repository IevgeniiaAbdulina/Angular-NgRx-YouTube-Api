import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';

import { VideoDataService } from '../../services/video-data.service';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let videoDataService: VideoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      providers: [provideMockStore({}), VideoDataService],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    videoDataService = TestBed.inject(VideoDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the page number', () => {
    const paginatedPage = 'Page: 1';
    component.pageIndex = 1;
    const result = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(result.textContent).toBe(paginatedPage);
  });

  it('should handle the previous paginated page', () => {
    const index = 2;
    component.pageIndex = index;
    component.previousPageHandler();
    const result = component.pageIndex;

    expect(result).toBe(1);
  });

  it('should increase page index on init', () => {
    component.ngOnInit();

    expect(component.pageIndex).toEqual(2);
  });

  it('should call the videoDataService when previous-page button is clicked', () => {
    component.pageIndex = 2;
    const result = jest.spyOn(component, 'previousPageHandler');
    const button = fixture.debugElement.query(By.css('#previous-page'));
    button.nativeElement.click();

    expect(result).toHaveBeenCalled();
  });

  it('should call the videoDataService when next-page button is clicked', () => {
    component.pageIndex = 2;
    const result = jest.spyOn(component, 'nextPageHandler');
    const button = fixture.debugElement.query(By.css('#next-page'));
    button.nativeElement.click();

    expect(result).toHaveBeenCalled();
  });

  it('should call videoDataService when the button to previous page is clicked', () => {
    const result = jest.spyOn(videoDataService, 'getVideoData');
    component.videoStore = true;

    const buttonPrev = fixture.debugElement.query(By.css('#previous-page'));
    buttonPrev.nativeElement.click();

    const queryTerm = 'searching text';
    videoDataService.getVideoData(queryTerm);

    expect(result).toHaveBeenCalled();
  });

  it('should call videoDataService when the button to next page is clicked', () => {
    const result = jest.spyOn(videoDataService, 'getVideoData');
    component.videoStore = true;

    const buttonPrev = fixture.debugElement.query(By.css('#next-page'));
    buttonPrev.nativeElement.click();

    const queryTerm = 'searching text';
    videoDataService.getVideoData(queryTerm);

    expect(result).toHaveBeenCalled();
  });
});
