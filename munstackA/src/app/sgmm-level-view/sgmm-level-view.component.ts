// File: sgmm-level-views.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import your level components
import { SgmmLevel0OverviewComponent } from './sgmm-level0-overview/sgmm-level0-overview.component';
import { SgmmLevel1SpheresComponent } from './sgmm-level1-spheres-component/sgmm-level1-spheres-component.component';

@Component({
  standalone: true,
  selector: 'app-sgmm-level-views',
  template: `
    <div class="bg-white p-6 rounded-lg shadow-md">

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
      <div *ngIf="currentLevel === 2" class="bg-green-50 rounded-lg p-8 text-center relative">
        <h3 class="text-xl font-bold mb-4">Stakeholders</h3>
        <!-- more code for level 2... -->
      </div>

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
export class SgmmLevelViewsComponent {
  @Input() currentLevel!: number;
  @Input() selectedDimensions!: any; // or a typed interface

  @Output() zoomIn = new EventEmitter<void>();
}
