import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-vertical-selector',
  templateUrl: './vertical-selector.component.html',
  styleUrls: ['./vertical-selector.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class VerticalSelectorComponent implements OnInit {
  @Output() verticalChange = new EventEmitter<string>();

  verticals: string[] = [];
  selectedVertical: string = '';

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.verticals = this.campaignService.getVerticals();
    const currentCampaign = this.campaignService.getCurrentCampaign();
    if (currentCampaign?.selectedVertical) {
      this.selectedVertical = currentCampaign.selectedVertical;
    }
  }

  onVerticalChange(): void {
    if (this.selectedVertical) {
      this.campaignService.selectVertical(this.selectedVertical);
      this.verticalChange.emit(this.selectedVertical);
    }
  }

  openVerticalManager(): void {
    // TODO: Implement vertical management functionality
    console.log('Open vertical manager');
  }
}
