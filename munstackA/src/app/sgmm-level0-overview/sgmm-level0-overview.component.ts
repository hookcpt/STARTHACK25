// sgmm-level0-overview.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-sgmm-level0-overview',
  template: `
    <div class="bg-blue-50 rounded-lg p-8 text-center relative">
      <div class="absolute right-2 top-2 text-sm text-gray-500">10,000 ft View</div>
      <h3 class="text-xl font-bold mb-4">The St. Gallen Management Model</h3>

      <!-- Example visual or layout -->
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
            (click)="zoomIn.emit()"
          >
            Environmental Spheres
          </div>
          <div 
            class="absolute right-40 top-24 cursor-pointer bg-green-100 p-2 rounded-lg shadow hover:bg-green-200"
            (click)="zoomIn.emit()"
          >
            Stakeholders
          </div>
          <div 
            class="absolute left-36 bottom-24 cursor-pointer bg-orange-100 p-2 rounded-lg shadow hover:bg-orange-200"
            (click)="zoomIn.emit()"
          >
            Processes
          </div>
          <div 
            class="absolute right-36 bottom-16 cursor-pointer bg-orange-100 p-2 rounded-lg shadow hover:bg-orange-200"
            (click)="zoomIn.emit()"
          >
            Development Modes
          </div>
        </div>
      </div>

      <div class="text-sm text-gray-600 mt-6">
        Click on any element to explore deeper, or use the zoom controls
      </div>
    </div>
  `,
  imports: [CommonModule],
})
export class SgmmLevel0OverviewComponent {
  @Output() zoomIn = new EventEmitter<void>();
}