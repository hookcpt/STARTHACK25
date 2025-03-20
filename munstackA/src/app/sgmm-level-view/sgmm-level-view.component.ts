import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { SharedStateService, Dimensions } from 'src/app/shared-state.service';
// Example sub-components
import { SgmmLevel0OverviewComponent } from './sgmm-level0-overview/sgmm-level0-overview.component';
import { SgmmLevel1SpheresComponent } from './sgmm-level1-spheres-component/sgmm-level1-spheres-component.component';

@Component({
  standalone: true,
  selector: 'app-sgmm-level-views',
  template: `
    <div class="bg-white p-6 rounded-lg shadow-md">

      <!-- Example button to "zoom in" if you want a manual trigger -->
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        (click)="zoomIn()"
      >
        Zoom In
      </button>

      <!-- Level 0: SGMM Overview -->
      <app-sgmm-level0-overview
        *ngIf="currentLevel === 0"
      ></app-sgmm-level0-overview>

      <!-- Level 1: Environmental Spheres -->
      <app-sgmm-level1-spheres
        *ngIf="currentLevel === 1"
      ></app-sgmm-level1-spheres>

      <!-- Future levels, 2, 3, etc. -->
      <div *ngIf="currentLevel === 2" class="bg-green-50 p-8 text-center">
        <h3 class="text-xl font-bold mb-4">Stakeholders</h3>
        <p>Market: {{ selectedDimensions.market }}</p>
        <!-- more content -->
      </div>

      <div *ngIf="currentLevel === 3" class="bg-yellow-50 p-8 relative">
        <h3 class="text-xl font-bold mb-4 text-center">Interaction Issues</h3>
        <!-- more content -->
      </div>

      <!-- etc. for level 4, 5, etc. -->
    </div>
  `,
  imports: [
    CommonModule,
    SgmmLevel0OverviewComponent,
    SgmmLevel1SpheresComponent
  ],
})
export class SgmmLevelViewsComponent implements OnInit, OnDestroy {
  currentLevel = 0;
  selectedDimensions!: Dimensions;

  private subs: Subscription[] = [];

  constructor(private sharedState: SharedStateService) {}

  ngOnInit(): void {
    // Subscribe to currentLevel
    const lvlSub = this.sharedState.currentLevel$.subscribe(level => {
      this.currentLevel = level;
    });
    this.subs.push(lvlSub);

    // Subscribe to dimensions
    const dimsSub = this.sharedState.dimensions$.subscribe(dims => {
      this.selectedDimensions = dims;
    });
    this.subs.push(dimsSub);

    // Initialize local copies
    this.currentLevel = this.sharedState.getCurrentLevel();
    this.selectedDimensions = this.sharedState.getDimensions();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  /**
   * Zoom in: call the service's zoomIn method
   * which increments currentLevel if possible.
   */
  zoomIn(): void {
    // If your service expects the levels array:
    const levels = this.sharedState.getLevels();
    this.sharedState.zoomIn(levels);

    // Alternatively, if your service doesn't need an array:
    // this.sharedState.zoomIn();
  }
}
