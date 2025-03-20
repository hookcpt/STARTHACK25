import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-sgmm-level1-spheres',
  imports: [CommonModule],
  template: `
    <div class="bg-green-50 rounded-lg p-8 text-center relative">
      <div class="absolute right-2 top-2 text-sm text-gray-500">5,000 ft View</div>
      <h3 class="text-xl font-bold mb-4">Environmental Spheres</h3>
      <div class="grid grid-cols-2 gap-6">
        <div class="bg-white p-4 rounded-lg shadow-md hover:bg-blue-50 cursor-pointer" (click)="zoomIn.emit()">
          <h4 class="font-bold">Economy</h4>
          <p class="text-sm">Markets, competitors, economic trends</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-md hover:bg-blue-50 cursor-pointer" (click)="zoomIn.emit()">
          <h4 class="font-bold">Technology</h4>
          <p class="text-sm">Innovations, digital transformation</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-md hover:bg-blue-50 cursor-pointer" (click)="zoomIn.emit()">
          <h4 class="font-bold">Nature</h4>
          <p class="text-sm">Environmental concerns, sustainability</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-md hover:bg-blue-50 cursor-pointer" (click)="zoomIn.emit()">
          <h4 class="font-bold">Society</h4>
          <p class="text-sm">Social trends, cultural values, politics</p>
        </div>
      </div>
    </div>
  `,
})
export class SgmmLevel1SpheresComponent {
  /**
   * Let the parent decide how to handle "zoomIn" (e.g., move to Level 2).
   */
  @Output() zoomIn = new EventEmitter<void>();
}
