import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import components
import { ExplorerInsightsComponent } from '../explorer-insights/explorer-insights.component';
import { SgmmLevel0OverviewComponent } from '../sgmm-level-view/sgmm-level0-overview/sgmm-level0-overview.component';
import { SgmmLevelViewsComponent } from '../sgmm-level-view/sgmm-level-view.component';
import { ExplorerHeaderComponent } from '../explorer-header/explorer-header.component';
import { ExplorerSidebarComponent } from '../explorer-sidebar/explorer-sidebar.component';
import { SharedStateService } from '../shared-state.service';
import { Subscription } from 'rxjs';

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
  constructor(private sharedState: SharedStateService) {}

  // Store dimensions
  selectedDimensions: Dimensions = {
    persona: 'Executive',
    market: 'Global',
    maturity: 'Growth',
    size: 'Medium',
    technology: 'Digital Native',
  };

  // Track current view step
  step = signal<number>(1); // Start at step 1 with only sidebar

  // Track zoom level
  currentLevel = signal<number>(0);
  levels: any;
  subs: Subscription[] = [];


  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subs.forEach(sub => sub.unsubscribe());
  }

  setLevel(index: number) {
    this.currentLevel.set(index);
  }
  

  // Methods that now delegate to SharedStateService
  zoomIn(): void {
    this.sharedState.zoomIn(this.levels);
  }

  zoomOut() {
    if (this.currentLevel() > 0) {
      this.currentLevel.update(level => level - 1);
    }
  }
  

  // Update selected dimension
  updateDimension(key: string, value: string) {
    // If selectedDimensions is typed as { [k: string]: string }
    // we can safely do bracket notation:
    
    // 1) Check if 'key' is an existing property in selectedDimensions
    if (Object.prototype.hasOwnProperty.call(this.selectedDimensions, key)) {
      this.selectedDimensions[key as keyof Dimensions] = value;
    }
  }

  nextStep() {
    if (this.step() < 3) {
      this.step.set(this.step() + 1);  
    }
  }

  // Final step reached -> Show full explorer
  completeSetup() {
    this.step.set(4);  
  }
}
