import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() customClass?: string;
  @Input() isDisabledButton?: boolean;
  @Output() buttonClick = new EventEmitter();

  customClasses?: string;

  ngOnInit(): void {
    this.customClasses = `reusable-btn ${this.customClass}`;
  }

  onClick(event: Event): void {
    this.buttonClick.emit(event);
  }
}
