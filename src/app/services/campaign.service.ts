import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Template {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  colors: string[];
  vertical: string;
}

export interface Asset {
  id: string;
  name: string;
  type: string;
  dimensions: string;
  thumbnailUrl: string;
  templateId: string;
  isParent: boolean;
  automate: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  selectedVertical: string | null;
  selectedTemplate: Template | null;
  selectedAssets: Asset[];
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private currentCampaignSubject = new BehaviorSubject<Campaign | null>(null);
  public currentCampaign$ = this.currentCampaignSubject.asObservable();

  private templates: Template[] = [
    {
      id: 'valentine-1',
      name: "Valentine's Special Blue",
      description: "Want cards, teddies, chocolates, hampers & more?",
      imageUrl: 'https://picsum.photos/80/60?random=1',
      colors: ['#4A90E2', '#E74C3C', '#9B59B6'],
      vertical: 'Dineout'
    },
    {
      id: 'valentine-2',
      name: "Valentine's Special Red",
      description: "Find the perfect Valentine's gift!",
      imageUrl: 'https://picsum.photos/80/60?random=2',
      colors: ['#E74C3C', '#F39C12', '#E91E63'],
      vertical: 'Dineout'
    },
    {
      id: 'valentine-3',
      name: "Valentine's Special Gold",
      description: "Make Valentine's Day Memorable!",
      imageUrl: 'https://picsum.photos/80/60?random=3',
      colors: ['#F39C12', '#E67E22', '#D4AF37'],
      vertical: 'Dineout'
    },
    {
      id: 'valentine-4',
      name: "Valentine's Special Pink",
      description: "Spread love with our special collection",
      imageUrl: 'https://picsum.photos/80/60?random=4',
      colors: ['#E91E63', '#F8BBD9', '#FF69B4'],
      vertical: 'Dineout'
    },
    {
      id: 'valentine-5',
      name: "Valentine's Special Brown",
      description: "Chocolate lovers paradise",
      imageUrl: 'https://picsum.photos/80/60?random=5',
      colors: ['#8D6E63', '#A1887F', '#D7CCC8'],
      vertical: 'Dineout'
    }
  ];

  private assets: Asset[] = [
    // Parent Assets
    {
      id: 'nudge-card-parent',
      name: 'Nudge-Card',
      type: 'Parent',
      dimensions: '360x130',
      thumbnailUrl: 'https://picsum.photos/80/60?random=6',
      templateId: 'valentine-2',
      isParent: true,
      automate: true
    },
    {
      id: 'po-carousel-parent',
      name: 'PO-Carousel',
      type: 'Parent',
      dimensions: '360x130',
      thumbnailUrl: 'https://picsum.photos/80/60?random=7',
      templateId: 'valentine-2',
      isParent: true,
      automate: true
    },
    {
      id: 'chiclet-parent',
      name: 'Chiclet',
      type: 'Parent',
      dimensions: '360x130',
      thumbnailUrl: 'https://picsum.photos/80/60?random=8',
      templateId: 'valentine-2',
      isParent: true,
      automate: true
    },
    // Child Assets
    {
      id: 'nudge-card-child-1',
      name: 'Nudge-Card Child-01',
      type: 'Child',
      dimensions: '360x130',
      thumbnailUrl: 'https://picsum.photos/80/60?random=9',
      templateId: 'valentine-2',
      isParent: false,
      automate: false
    },
    {
      id: 'nudge-card-child-2',
      name: 'Nudge-Card Child-02',
      type: 'Child',
      dimensions: '360x130',
      thumbnailUrl: 'https://picsum.photos/80/60?random=10',
      templateId: 'valentine-2',
      isParent: false,
      automate: false
    },
    {
      id: 'nudge-card-child-3',
      name: 'Nudge-Card Child-03',
      type: 'Child',
      dimensions: '360x130',
      thumbnailUrl: 'https://picsum.photos/80/60?random=11',
      templateId: 'valentine-2',
      isParent: false,
      automate: false
    },
    {
      id: 'vs-presearch-banner-child-4',
      name: 'VS-Presearch-banner Child-04',
      type: 'Child',
      dimensions: '360x130',
      thumbnailUrl: 'https://picsum.photos/80/60?random=12',
      templateId: 'valentine-2',
      isParent: false,
      automate: false
    },
    {
      id: 'chiclet-child-5',
      name: 'Chiclet Child-05',
      type: 'Child',
      dimensions: '360x130',
      thumbnailUrl: 'https://picsum.photos/80/60?random=13',
      templateId: 'valentine-2',
      isParent: false,
      automate: false
    }
  ];

  constructor() {
    this.initializeCampaign();
  }

  private initializeCampaign(): void {
    const newCampaign: Campaign = {
      id: this.generateId(),
      name: 'New Campaign',
      selectedVertical: null,
      selectedTemplate: null,
      selectedAssets: [],
      createdAt: new Date()
    };
    this.currentCampaignSubject.next(newCampaign);
  }

  getVerticals(): string[] {
    return ['Dineout', 'Restaurant', 'E-commerce', 'Fashion', 'Healthcare', 'Education'];
  }

  getTemplatesByVertical(vertical: string): Template[] {
    return this.templates.filter(template => template.vertical === vertical);
  }

  getAssetsByTemplate(templateId: string): Asset[] {
    return this.assets.filter(asset => asset.templateId === templateId);
  }

  getParentAssets(templateId: string): Asset[] {
    return this.assets.filter(asset => asset.templateId === templateId && asset.isParent);
  }

  getChildAssets(templateId: string): Asset[] {
    return this.assets.filter(asset => asset.templateId === templateId && !asset.isParent);
  }

  selectVertical(vertical: string): void {
    const currentCampaign = this.currentCampaignSubject.value;
    if (currentCampaign) {
      currentCampaign.selectedVertical = vertical;
      currentCampaign.selectedTemplate = null;
      currentCampaign.selectedAssets = [];
      this.currentCampaignSubject.next({ ...currentCampaign });
    }
  }

  selectTemplate(template: Template): void {
    const currentCampaign = this.currentCampaignSubject.value;
    if (currentCampaign) {
      currentCampaign.selectedTemplate = template;
      this.currentCampaignSubject.next({ ...currentCampaign });
    }
  }

  selectAsset(asset: Asset, selected: boolean): void {
    const currentCampaign = this.currentCampaignSubject.value;
    if (currentCampaign) {
      if (selected) {
        if (!currentCampaign.selectedAssets.find(a => a.id === asset.id)) {
          currentCampaign.selectedAssets.push(asset);
        }
      } else {
        currentCampaign.selectedAssets = currentCampaign.selectedAssets.filter(a => a.id !== asset.id);
      }
      this.currentCampaignSubject.next({ ...currentCampaign });
    }
  }

  selectAllAssets(templateId: string, selected: boolean): void {
    const assets = this.getAssetsByTemplate(templateId);
    assets.forEach(asset => {
      this.selectAsset(asset, selected);
    });
  }

  toggleAssetAutomation(assetId: string): void {
    const asset = this.assets.find(a => a.id === assetId);
    if (asset) {
      asset.automate = !asset.automate;
    }
  }

  getCurrentCampaign(): Campaign | null {
    return this.currentCampaignSubject.value;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
