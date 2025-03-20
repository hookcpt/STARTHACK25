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

  // Track zoom level using SharedStateService
  currentLevel!: number;
  levels = [
    '10,000 ft - SGMM Overview',
    '5,000 ft - Environmental Spheres',
    '2,500 ft - Stakeholders',
    '1,000 ft - Interaction Issues',
    '500 ft - Processes',
    'Ground Level - Management Practice',
  ];
  subs: Subscription[] = [];

  ngOnInit(): void {
    // Subscribe to currentLevel from SharedStateService
    const levelSub = this.sharedState.currentLevel$.subscribe(level => {
      this.currentLevel = level;
    });
    this.subs.push(levelSub);
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subs.forEach(sub => sub.unsubscribe());
  }

  // Delegate level updates to SharedStateService
  setLevel(index: number): void {
    this.sharedState.setLevel(index);
  }

  zoomIn(): void {
    this.sharedState.zoomIn(this.levels);
  }

  zoomOut() {
    this.sharedState.zoomOut();
  }

  // Update selected dimension
  updateDimension(key: string, value: string) {
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
