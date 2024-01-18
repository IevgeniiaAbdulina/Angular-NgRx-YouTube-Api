import { Component, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

@Component({
  template: `
    <button
      [ngClass]="customClasses"
      type="button"
      (click)="onClick($event)"
      [disabled]="isDisabledButton">
      <ng-content></ng-content>
    </button>
  `
})
class TestHostButtonComponent {
  public customClass?: 'test-button';
  public isDisabledButton?: true;
  public buttonClick = new EventEmitter();

  onClick(event: Event): void {
    this.buttonClick.emit(event);
  }
}

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    });
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
