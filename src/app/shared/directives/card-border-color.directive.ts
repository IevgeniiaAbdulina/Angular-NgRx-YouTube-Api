import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

enum Colors {
  red = 'red',
  yellow = 'yellow',
  green = 'green',
  blue = 'blue'
}

@Directive({
  selector: '[appCardBorderColor]'
})
export class CardBorderColorDirective implements OnInit {
  @Input('appCardBorderColor') publishedDay?: string;

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'border-bottom-color',
      this.sortingByPublicationDate()
    );
  }

  sortingByPublicationDate(): string {
    if (!this.publishedDay) return '';

    const today = new Date().getTime();
    const publicationDay = new Date(this.publishedDay).getTime();

    const diffDate = new Date(today - publicationDay);
    const diffYY = diffDate.getUTCFullYear() - 1970;
    const diffMM = diffDate.getUTCMonth();
    const diffDD = diffDate.getUTCDate() - 1;

    if (diffYY >= 1) {
      return Colors.red;
    }
    if (diffMM > 6) {
      return Colors.red;
    }
    if (diffMM > 1 && diffMM <= 6) {
      return Colors.yellow;
    }
    if (diffDD > 7 && diffMM <= 1) {
      return Colors.green;
    }
    if (diffDD <= 7) {
      return Colors.blue;
    }

    return '';
  }
}
