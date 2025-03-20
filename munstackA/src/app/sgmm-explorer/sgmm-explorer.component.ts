// File: STARTHACK25/munstackA/src/app/sgmm-explorer/sgmm-explorer.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import your child components (adjust paths as needed)
import { ExplorerInsightsComponent } from '../explorer-insights/explorer-insights.component';
import { SgmmLevel0OverviewComponent } from '../sgmm-level0-overview/sgmm-level0-overview.component';
import { SgmmLevelViewsComponent } from '../sgmm-level-view/sgmm-level-view.component';
import { ExplorerHeaderComponent } from '../explorer-header/explorer-header.component';
import { ExplorerSidebarComponent } from '../explorer-sidebar/explorer-sidebar.component';

export interface Dimensions {
  persona: string;
  market: string;
  maturity: string;
  size: string;
  technology: string;
}

@Component({
  selector: 'app-sgmm-explorer',
  templateUrl: './sgmm-explorer.component.html',
  styleUrls: ['./sgmm-explorer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ExplorerInsightsComponent,
    SgmmLevelViewsComponent,
    SgmmLevel0OverviewComponent,
    ExplorerHeaderComponent,
    ExplorerSidebarComponent
  ],
})
export class SgmmExplorerComponent {

  // typed object
  selectedDimensions:{ [k: string]: string } = {
    persona: 'Executive',
    market: 'Global',
    maturity: 'Growth',
    size: 'Medium',
    technology: 'Digital Native',
  };
  

  // Using Angular Signals (requires Angular 16+)
  currentLevel = signal<number>(0);
  levels: any;

  zoomIn() {
    if (this.currentLevel() < this.levels.length - 1) {
      this.currentLevel.update(l => l + 1);
    }
  }

  zoomOut() {
    if (this.currentLevel() > 0) {
      this.currentLevel.update(l => l - 1);
    }
  }

  setLevel(index: number) {
    this.currentLevel.set(index);
  }

  // 3) Generic method that only allows valid dimension keys
  updateDimension(key: string, value: string) {
    // If selectedDimensions is typed as { [k: string]: string }
    // we can safely do bracket notation:
    
    // 1) Check if 'key' is an existing property in selectedDimensions
    if (Object.prototype.hasOwnProperty.call(this.selectedDimensions, key)) {
      this.selectedDimensions[key] = value;
    }
    // else ignore or handle differently
  }  
}
