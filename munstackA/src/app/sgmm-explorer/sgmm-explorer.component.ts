// File: STARTHACK25/munstackA/src/app/sgmm-explorer/sgmm-explorer.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import your child components (adjust paths as needed)
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

  // Subscriptions to BehaviorSubjects
  private subs: Subscription[] = [];
  selectedDimensions!: Dimensions;
  currentLevel!: number;

  // Example levels array
  levels = [
    '10,000 ft - SGMM Overview',
    '5,000 ft - Environmental Spheres',
    '2,500 ft - Stakeholders',
    '1,000 ft - Interaction Issues',
    '500 ft - Processes',
    'Ground Level - Management Practice',
  ];


  constructor(private sharedState: SharedStateService) {}

  ngOnInit(): void {
    // Subscribe to dimension changes
    const dimSub = this.sharedState.dimensions$.subscribe(dims => {
      this.selectedDimensions = dims;
    });
    this.subs.push(dimSub);

    // Subscribe to currentLevel changes
    const levelSub = this.sharedState.currentLevel$.subscribe(level => {
      this.currentLevel = level;
    });
    this.subs.push(levelSub);

    // Initialize local copies
    this.selectedDimensions = this.sharedState.getDimensions();
    this.currentLevel = this.sharedState.getCurrentLevel();
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subs.forEach(sub => sub.unsubscribe());
  }

  // Methods that now delegate to SharedStateService
  zoomIn(): void {
    this.sharedState.zoomIn(this.levels);
  }

  zoomOut(): void {
    this.sharedState.zoomOut();
  }

  setLevel(index: number): void {
    this.sharedState.setLevel(index);
  }

  // This updates a single dimension property
  updateDimension(key: string, value: string): void {
    this.sharedState.updateDimension(key as keyof Dimensions, value);
  }

}