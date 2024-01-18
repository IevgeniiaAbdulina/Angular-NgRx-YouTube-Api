import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { CardComponent } from 'src/app/youtube/components/card/card.component';

import { CardBorderColorDirective } from './card-border-color.directive';

describe('CardBorderColorDirective', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let cardEl: DebugElement;
  let elementRef: ElementRef;
  let renderer2: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent, CardBorderColorDirective],
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({})]
    });

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    cardEl = fixture.debugElement.query(By.css('#video-card-element'));
  });

  it('should create an instance', () => {
    const directive = new CardBorderColorDirective(elementRef, renderer2);
    expect(directive).toBeTruthy();
  });
});
