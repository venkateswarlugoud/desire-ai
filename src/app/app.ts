import { Component } from '@angular/core';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  template: `<app-main-layout></app-main-layout>`,
  standalone: true,
  imports: [MainLayoutComponent],
})
export class AppComponent {}
