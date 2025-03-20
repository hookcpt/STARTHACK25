import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dimensions } from '../sgmm-explorer/sgmm-explorer.component';

@Component({
  standalone: true,
  selector: 'app-explorer-sidebar',
  template: `
    <div>
      <!-- Your Dimensions -->
      <div class="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 class="font-bold text-lg mb-3">Your Dimensions</h2>
        <div class="space-y-3">
          <!-- Persona -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Persona</label>
            <select
              class="w-full border rounded p-2 text-sm"
              [ngModel]="selectedDimensions.persona"
              (ngModelChange)="emitDimensionChange('persona', $event)"
            >
              <option>Executive</option>
              <option>Manager</option>
              <option>Team Leader</option>
              <option>Consultant</option>
              <option>Entrepreneur</option>
            </select>
          </div>

          <!-- Market -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Market</label>
            <select
              class="w-full border rounded p-2 text-sm"
              [ngModel]="selectedDimensions.market"
              (ngModelChange)="emitDimensionChange('market', $event)"
            >
              <option>Global</option>
              <option>Regional</option>
              <option>National</option>
              <option>Local</option>
            </select>
          </div>

          <!-- Maturity Level -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Maturity Level</label>
            <select
              class="w-full border rounded p-2 text-sm"
              [ngModel]="selectedDimensions.maturity"
              (ngModelChange)="emitDimensionChange('maturity', $event)"
            >
              <option>Startup</option>
              <option>Growth</option>
              <option>Mature</option>
              <option>Transformation</option>
            </select>
          </div>

          <!-- Enterprise Size -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Enterprise Size</label>
            <select
  class="w-full border rounded p-2 text-sm"
  [ngModel]="selectedDimensions['persona']"
  (ngModelChange)="emitDimensionChange('persona', $event)"
>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
              <option>Enterprise</option>
            </select>
          </div>

          <!-- Technology Adoption -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Technology Adoption</label>
            <select
              class="w-full border rounded p-2 text-sm"
              [ngModel]="selectedDimensions.technology"
              (ngModelChange)="emitDimensionChange('technology', $event)"
            >
              <option>Traditional</option>
              <option>Transitioning</option>
              <option>Digital Native</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="bg-white p-4 rounded-lg shadow-md">
        <h2 class="font-bold text-lg mb-3">Navigation</h2>
        <div class="space-y-2">
          <div
            *ngFor="let level of levels; let i = index"
            class="flex items-center p-2 rounded cursor-pointer"
            [ngClass]="{
              'bg-blue-100 text-blue-700': currentLevel === i, 
              'hover:bg-gray-100': currentLevel !== i
            }"
            (click)="levelChange.emit(i)"
          >
            <i *ngIf="currentLevel === i" class="lucide-chevron-down mr-2"></i>
            <i *ngIf="currentLevel !== i" class="lucide-chevron-right mr-2"></i>
            <span class="text-sm">{{ level }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [CommonModule, FormsModule, NgForOf],
})
export class ExplorerSidebarComponent {
  @Input() levels: string[] = [];
  @Input() currentLevel!: number;

  // Use the interface instead of [key: string]: string
  @Input() selectedDimensions!: Dimensions;

  @Output() levelChange = new EventEmitter<number>();
  @Output() dimensionChange = new EventEmitter<{ key: string; value: string }>();

  emitDimensionChange(key: keyof Dimensions, value: string) {
    this.dimensionChange.emit({ key, value });
  }
}