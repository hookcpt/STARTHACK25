// sgmm-level0-overview.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedStateService } from 'src/app/shared-state.service';

@Component({
  standalone: true,
  selector: 'app-sgmm-level0-overview',
  template: `
<!-- sgmm-level0-overview.component.html -->
<div class="bg-blue-50 rounded-lg p-8 text-center relative">
  <div class="absolute right-2 top-2 text-sm text-gray-500">10,000 ft View</div>
  <h3 class="text-xl font-bold mb-4">The St. Gallen Management Model</h3>

  <div class="flex justify-center">
    <div class="relative w-96 h-96">
      <div class="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
      <div class="absolute inset-8 border-4 border-green-200 rounded-full flex items-center justify-center">
        <div class="absolute inset-8 border-4 border-orange-200 rounded-full flex items-center justify-center">
          <div class="w-24 h-24 bg-red-200 rounded-full flex items-center justify-center text-sm font-bold">
            Management
          </div>
          <div class="absolute text-sm font-bold text-green-700 -top-2">Environment</div>
          <div class="absolute text-sm font-bold text-orange-700 -bottom-2">Organization</div>
        </div>
      </div>

      <!-- Interactive hotspots -->
      <div
        class="absolute left-40 top-8 cursor-pointer bg-green-100 p-2 rounded-lg shadow hover:bg-green-200"
        (click)="goToLevel(1)"
      >
        Environmental Spheres
      </div>
      <div
        class="absolute right-40 top-24 cursor-pointer bg-green-100 p-2 rounded-lg shadow hover:bg-green-200"
        (click)="goToLevel(2)"
      >
        Stakeholders
      </div>
      <div
        class="absolute left-36 bottom-24 cursor-pointer bg-orange-100 p-2 rounded-lg shadow hover:bg-orange-200"
        (click)="goToLevel(3)"
      >
        Processes
      </div>
      <div
        class="absolute right-36 bottom-16 cursor-pointer bg-orange-100 p-2 rounded-lg shadow hover:bg-orange-200"
        (click)="goToLevel(4)"
      >
        Development Modes
      </div>
    </div> <!-- Close .relative w-96 h-96 -->
  </div> <!-- Close .flex justify-center -->

  <div class="text-sm text-gray-600 mt-6">
    Click on any element to explore deeper, or use the zoom controls
  </div>
</div> <!-- Close .bg-blue-50 rounded-lg p-8 text-center relative -->


  `,
  imports: [CommonModule],
})
// sgmm-level0-overview.component.ts
@Component({
  standalone: true,
  selector: 'app-sgmm-level0-overview',
  templateUrl: './sgmm-level0-overview.component.html',
  imports: [CommonModule],
})
export class SgmmLevel0OverviewComponent implements OnInit {
  currentLevel = 0;

  constructor(private sharedState: SharedStateService) {}

  ngOnInit(): void {
    // Grab the initial level immediately
  this.currentLevel = this.sharedState.getCurrentLevel();
  
    // Subscribe to currentLevel to reflect changes
    this.sharedState.currentLevel$.subscribe(level => {
      console.log('SgmmExplorerComponent sees new level:', level);
      this.currentLevel = level;
    });
    
  }

  goToLevel(newLevel: number) {
    console.log('SgmmLevel0OverviewComponent: goToLevel called with', newLevel);
    this.sharedState.setLevel(newLevel);
    console.log('SgmmLevel0OverviewComponent: after calling setLevel');
  }
  
}

