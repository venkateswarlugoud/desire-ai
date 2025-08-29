import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateCardComponent } from '../template-card/template-card.component';
import { Template } from '../../services/campaign.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TemplateCardComponent
  ]
})
export class TemplateListComponent {
  @Input() templates: Template[] = [];
  @Input() selectedTemplate: Template | null = null;
  @Output() templateSelect = new EventEmitter<Template>();

  onTemplateSelect(template: Template): void {
    this.templateSelect.emit(template);
  }
}
