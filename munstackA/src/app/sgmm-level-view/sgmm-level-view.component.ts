// File: sgmm-level-views.component.ts
import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import your level components
import { SgmmLevel0OverviewComponent } from './sgmm-level0-overview/sgmm-level0-overview.component';
import { SgmmLevel1SpheresComponent } from './sgmm-level1-spheres-component/sgmm-level1-spheres-component.component';
import { Subscription } from 'rxjs';
import { Dimensions, SharedStateService } from '../shared-state.service';

  @Component({
    standalone: true,
    selector: 'app-sgmm-level-views',
    template: `
      <div class="bg-white p-6 rounded-lg shadow-md">
        <p>Current Level: {{ currentLevel }}</p>

        <!-- Level 0: SGMM Overview -->
        <app-sgmm-level0-overview
          *ngIf="currentLevel === 0"
          (zoomIn)="zoomIn.emit()"
        ></app-sgmm-level0-overview>

        <!-- Level 1: Environmental Spheres -->
        <app-sgmm-level1-spheres
          *ngIf="currentLevel === 1"
          (zoomIn)="zoomIn.emit()"
        ></app-sgmm-level1-spheres>

        <!-- Future levels 2, 3, etc. can go here -->
        <app-sgmm-level2-stakeholders
          *ngIf="currentLevel === 2"
          [selectedDimensions]="selectedDimensions"
          (zoomIn)="zoomIn.emit()"
        ></app-sgmm-level2-stakeholders>

        <div *ngIf="currentLevel === 3" class="bg-yellow-50 rounded-lg p-8 relative">
          <h3 class="text-xl font-bold mb-4 text-center">Interaction Issues</h3>
          <!-- more code for level 3... -->
        </div>

        <!-- etc. for levels 4, 5, etc. -->

    </div>
  `,
  imports: [
    CommonModule,
    SgmmLevel0OverviewComponent,
    SgmmLevel1SpheresComponent,
    // future level components if you break them out similarly
  ],
})
export class SgmmLevelViewsComponent implements OnInit, OnDestroy {
  // No @Input() needed
  currentLevel = 0;
  selectedDimensions!: Dimensions;

  private subs: Subscription[] = [];

  constructor(private sharedState: SharedStateService) {}

  ngOnInit(): void {
    // Subscribe to currentLevel from the service
    const lvlSub = this.sharedState.currentLevel$.subscribe(level => {
      this.currentLevel = level;
    });
    this.subs.push(lvlSub);

    // Subscribe to dimensions from the service
    const dimsSub = this.sharedState.dimensions$.subscribe(dims => {
      this.selectedDimensions = dims;
    });
    this.subs.push(dimsSub);

    // Initialize local copies right away (optional)
    this.currentLevel = this.sharedState.getCurrentLevel();
    this.selectedDimensions = this.sharedState.getDimensions();
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subs.forEach(s => s.unsubscribe());
  }
}