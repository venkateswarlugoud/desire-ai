import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AssetCardComponent } from '../asset-card/asset-card.component';
import { Asset } from '../../services/campaign.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    AssetCardComponent
  ]
})
export class AssetListComponent implements OnInit {
  @Input() assets: Asset[] = [];
  @Input() selectedAssets: Asset[] = [];
  @Output() assetSelect = new EventEmitter<{asset: Asset, selected: boolean}>();
  @Output() automationToggle = new EventEmitter<{asset: Asset, automate: boolean}>();
  @Output() selectAll = new EventEmitter<boolean>();

  searchTerm: string = '';
  viewMode: 'grid' | 'list' = 'grid';
  filteredAssets: Asset[] = [];

  ngOnInit(): void {
    this.filteredAssets = this.assets;
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.filteredAssets = this.assets.filter(asset =>
        asset.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        asset.type.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredAssets = this.assets;
    }
  }

  onAssetSelect(event: {asset: Asset, selected: boolean}): void {
    this.assetSelect.emit(event);
  }

  onAutomationToggle(event: {asset: Asset, automate: boolean}): void {
    this.automationToggle.emit(event);
  }

  onSelectAll(selected: boolean): void {
    this.selectAll.emit(selected);
  }

  isAssetSelected(asset: Asset): boolean {
    return this.selectedAssets.some(selectedAsset => selectedAsset.id === asset.id);
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  getParentAssets(): Asset[] {
    return this.filteredAssets.filter(asset => asset.isParent);
  }

  getChildAssets(): Asset[] {
    return this.filteredAssets.filter(asset => !asset.isParent);
  }
}
