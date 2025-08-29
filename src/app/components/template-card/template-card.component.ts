import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { Template } from '../../services/campaign.service';

@Component({
  selector: 'app-template-card',
  templateUrl: './template-card.component.html',
  styleUrls: ['./template-card.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatRadioModule
  ]
})
export class TemplateCardComponent {
  @Input() template!: Template;
  @Input() isSelected: boolean = false;
  @Output() templateSelect = new EventEmitter<Template>();

  onTemplateSelect(): void {
    this.templateSelect.emit(this.template);
  }
}
