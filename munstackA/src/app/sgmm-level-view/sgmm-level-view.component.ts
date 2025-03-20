// sgmm-level-views.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgmmLevel0OverviewComponent } from '../sgmm-level0-overview/sgmm-level0-overview.component';
// (You might import SgmmLevel1SpheresComponent, etc. if you have them)

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

      <!-- Level 1, 2, 3, etc. can follow similarly -->
      <div *ngIf="currentLevel === 1" class="bg-green-50 rounded-lg p-8 text-center relative">
        <h3 class="text-xl font-bold mb-4">Environmental Spheres</h3>
        <!-- More content... -->
      </div>
      <!-- etc. for levels 2, 3, 4... -->
    </div>
  `,
  imports: [
    CommonModule,
    SgmmLevel0OverviewComponent,
    // SgmmLevel1SpheresComponent, etc. if you have them
  ],
})
export class SgmmLevelViewsComponent {
  @Input() currentLevel!: number;
  @Input() selectedDimensions!: any;

  @Output() zoomIn = new EventEmitter<void>();

  // If you want to handle zooming from inside:
  // You could also define zoomInLocal() { ... } and call that from the child, etc.
}
