import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-main-cta',
  templateUrl: './main-cta.component.html',
  styleUrls: ['./main-cta.component.css'],
  standalone: true,
  imports: [CommonModule, NgClass],
})
export class MainCtaComponent {
  @Input() step: number = 1;
  @Input() canProceed: boolean = false;

  @Output() nextClicked = new EventEmitter<void>();
  @Output() backClicked = new EventEmitter<void>();
}
