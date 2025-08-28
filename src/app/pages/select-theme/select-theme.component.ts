import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-select-theme',
  templateUrl: './select-theme.component.html',
  styleUrls: ['./select-theme.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
  ]
})
export class SelectThemeComponent {
  @Output() selectedChange = new EventEmitter<boolean>();

  verticals = ['Dineout', 'Restaurant', 'E-commerce', 'Fashion'];
  themes: { [key: string]: string[] } = {
    Dineout: [
      "Valentine Special Blue",
      "Valentine Special Red",
      "Valentine Special Gold",
      "Valentine Special Pink",
      "Valentine Special Brown"
    ],
    Restaurant: ["Fine Dining", "Family Feast"],
    "E-commerce": ["Flash Sale", "Summer Vibes"],
    Fashion: ["Spring Look", "Winter Collection"]
  };

  selectedVertical: string = '';
  filteredThemes: string[] = [];
  selectedTheme: string | null = null;

  onVerticalChange() {
    this.filteredThemes = this.themes[this.selectedVertical] || [];
    this.selectedTheme = null;
    this.selectedChange.emit(false);
  }

  selectTheme(theme: string) {
    this.selectedTheme = theme;
    this.selectedChange.emit(true);
  }
}
