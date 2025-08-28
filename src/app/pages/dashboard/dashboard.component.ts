import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-content">
      <h2>Dashboard</h2>
      <!-- Add dashboard related content here -->
    </div>
  `,
  styles: [`
    .dashboard-content {
      padding: 16px;
      font-family: Roboto, Arial, sans-serif;
    }
  `],
  standalone: true,
})
export class DashboardComponent { }
