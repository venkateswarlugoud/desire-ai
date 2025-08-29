import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Asset } from '../../services/campaign.service';

@Component({
  selector: 'app-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ]
})
export class AssetCardComponent {
  @Input() asset!: Asset;
  @Input() isSelected: boolean = false;
  @Output() assetSelect = new EventEmitter<{asset: Asset, selected: boolean}>();
  @Output() automationToggle = new EventEmitter<{asset: Asset, automate: boolean}>();

  onAssetSelect(selected: boolean): void {
    this.assetSelect.emit({ asset: this.asset, selected });
  }

  onAutomationToggle(automate: boolean): void {
    this.automationToggle.emit({ asset: this.asset, automate });
  }
}
