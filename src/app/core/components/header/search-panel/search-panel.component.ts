import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  Subscription
} from 'rxjs';
import { getVideoDataAction } from 'src/app/redux/actions/video-api.actions';
import { SessionData } from 'src/app/youtube/services/session-data';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnDestroy {
  @ViewChild('input') inputElement!: ElementRef;

  public queryTerm = new BehaviorSubject<string>('');
  public getQueryTerm: Observable<string> = this.queryTerm?.asObservable();

  private subscriptions: Subscription = new Subscription();

  public setQueryTerm(q: string): void {
    this.queryTerm.next(q);
    localStorage.setItem('queryTerm', q);
  }

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.subscriptions.add(
      this.queryTerm
        .pipe(
          filter((str: string) => str.length > 3),
          debounceTime(1500),
          distinctUntilChanged()
        )
        .subscribe((value: string) => {
          this.store.dispatch(
            getVideoDataAction({
              searchValue: value,
              pageToken: SessionData.pageToken
            })
          );
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  clearButtonHandler(): void {
    this.inputElement.nativeElement.value = '';
    this.setQueryTerm('');
  }

  searchButtonHandler(event: MouseEvent): void {
    event.preventDefault();
    const { value } = this.inputElement.nativeElement;

    this.setQueryTerm(value);
    this.router.navigateByUrl('/video');
  }
}
