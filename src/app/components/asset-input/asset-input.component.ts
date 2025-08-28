import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-asset-input',
  templateUrl: './asset-input.component.html',
  styleUrls: ['./asset-input.component.css'],
  standalone: true,
  imports: [MatCardModule]
})
export class AssetInputComponent { }
