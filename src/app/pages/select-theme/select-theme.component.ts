import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalSelectorComponent } from '../../components/vertical-selector/vertical-selector.component';
import { TemplateListComponent } from '../../components/template-list/template-list.component';
import { CampaignService, Template } from '../../services/campaign.service';

@Component({
  selector: 'app-select-theme',
  templateUrl: './select-theme.component.html',
  styleUrls: ['./select-theme.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    VerticalSelectorComponent,
    TemplateListComponent
  ]
})
export class SelectThemeComponent implements OnInit {
  @Output() selectedChange = new EventEmitter<boolean>();
  
  templates: Template[] = [];
  selectedTemplate: Template | null = null;

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.campaignService.currentCampaign$.subscribe(campaign => {
      if (campaign?.selectedTemplate) {
        this.selectedTemplate = campaign.selectedTemplate;
        this.selectedChange.emit(true);
      }
    });
  }

  onVerticalChange(vertical: string): void {
    this.templates = this.campaignService.getTemplatesByVertical(vertical);
    this.selectedTemplate = null;
    this.selectedChange.emit(false);
  }

  onTemplateSelect(template: Template): void {
    this.campaignService.selectTemplate(template);
    this.selectedTemplate = template;
    this.selectedChange.emit(true);
  }
}
