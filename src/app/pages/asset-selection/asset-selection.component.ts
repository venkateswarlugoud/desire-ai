import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetListComponent } from '../../components/asset-list/asset-list.component';
import { CampaignService, Asset } from '../../services/campaign.service';

@Component({
  selector: 'app-asset-selection',
  templateUrl: './asset-selection.component.html',
  styleUrls: ['./asset-selection.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    AssetListComponent
  ]
})
export class AssetSelectionComponent implements OnInit {
  assets: Asset[] = [];
  selectedAssets: Asset[] = [];
  selectedTemplate: any = null;

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.campaignService.currentCampaign$.subscribe(campaign => {
      if (campaign?.selectedTemplate) {
        this.selectedTemplate = campaign.selectedTemplate;
        this.assets = this.campaignService.getAssetsByTemplate(campaign.selectedTemplate.id);
      }
      if (campaign?.selectedAssets) {
        this.selectedAssets = campaign.selectedAssets;
      }
    });
  }

  onAssetSelect(event: {asset: Asset, selected: boolean}): void {
    this.campaignService.selectAsset(event.asset, event.selected);
  }

  onAutomationToggle(event: {asset: Asset, automate: boolean}): void {
    this.campaignService.toggleAssetAutomation(event.asset.id);
  }

  onSelectAll(selected: boolean): void {
    if (this.selectedTemplate) {
      this.campaignService.selectAllAssets(this.selectedTemplate.id, selected);
    }
  }

  updateAssets(): void {
    // This would typically save the current state
    console.log('Updating assets:', this.selectedAssets);
  }
}
