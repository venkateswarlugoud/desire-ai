import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CampaignComponent } from './pages/campaign/campaign.component';
import { SelectThemeComponent } from './pages/select-theme/select-theme.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default
  { path: 'dashboard', component: DashboardComponent },
  { path: 'campaign', component: CampaignComponent },
  { path: 'select-theme', component: SelectThemeComponent }
];
