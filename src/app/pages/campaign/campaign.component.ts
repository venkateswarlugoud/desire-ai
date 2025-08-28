import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MainCtaComponent } from '../../components/main-cta/main-cta.component';
import { SelectThemeComponent } from '../select-theme/select-theme.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MainCtaComponent,
    SelectThemeComponent,
  ]
})
export class CampaignComponent {
  step = 1;
  description = '';
  offer = '';
  visual = '';
  referenceImage: File | null = null;
  isThemeSelected = false;
  constructor(private router: Router) {}
  canProceed(): boolean {
    if (this.step === 1) {
      return true; // Allow proceeding without filling inputs (per your request)
    }
    return this.step === 2 && this.isThemeSelected;
  }

goNext() {
  console.log('goNext called'); // Debug
  if (this.canProceed()) {
    this.router.navigate(['/select-theme']);
  }
}


  goBack() {
    if (this.step === 2) {
      this.step = 1;
    }
  }

  onImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.referenceImage = input.files[0];
    } else {
      this.referenceImage = null;
    }
  }

  themeSelected(selected: boolean) {
    this.isThemeSelected = selected;
  }
}
