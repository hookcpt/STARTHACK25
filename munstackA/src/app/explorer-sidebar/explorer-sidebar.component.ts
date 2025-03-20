import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Dimensions } from '../shared-state.service';

@Component({
  standalone: true,
  selector: 'app-explorer-sidebar',
  template: `
    <div class="p-6">
      
      <!-- Progress Indicator -->
      <div class="flex items-center mb-4">
        <div class="w-1/3 h-1 rounded" [ngClass]="{ 'bg-blue-600': step >= 1, 'bg-gray-200': step < 1 }"></div>
        <div class="w-1/3 h-1 rounded mx-1" [ngClass]="{ 'bg-blue-600': step >= 2, 'bg-gray-200': step < 2 }"></div>
        <div class="w-1/3 h-1 rounded" [ngClass]="{ 'bg-blue-600': step >= 3, 'bg-gray-200': step < 3 }"></div>
      </div>

      <!-- Step 1: Personalization -->
      <div *ngIf="step === 1">
        <h1 class="text-xl font-bold mb-1">Personalise your experience</h1>
        <p class="text-sm text-gray-500 mb-5">Choose your interests.</p>

        <!-- Your Dimensions Section -->
        <div class="bg-white p-4 rounded-lg shadow-md">
          <h2 class="font-bold text-lg mb-3">Your Dimensions</h2>
          <div class="space-y-4">
            <!-- Persona -->
            <div>
              <label class="block text-sm font-medium text-gray-900">Persona</label>
              <select class="w-full border rounded-md p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                      [ngModel]="selectedDimensions.persona"
                      (ngModelChange)="emitDimensionChange('persona', $event)">
                <option>Executive</option>
                <option>Manager</option>
                <option>Team Leader</option>
                <option>Consultant</option>
                <option>Entrepreneur</option>
              </select>
            </div>

            <!-- Market -->
            <div>
              <label class="block text-sm font-medium text-gray-900">Market</label>
              <select class="w-full border rounded-md p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                      [ngModel]="selectedDimensions.market"
                      (ngModelChange)="emitDimensionChange('market', $event)">
                <option>Global</option>
                <option>Regional</option>
                <option>National</option>
                <option>Local</option>
              </select>
            </div>

            <!-- Maturity Level -->
            <div>
              <label class="block text-sm font-medium text-gray-900">Maturity Level</label>
              <select class="w-full border rounded-md p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                      [ngModel]="selectedDimensions.maturity"
                      (ngModelChange)="emitDimensionChange('maturity', $event)">
                <option>Startup</option>
                <option>Growth</option>
                <option>Mature</option>
                <option>Transformation</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Knowledge Domain -->
      <div *ngIf="step === 2">
        <h1 class="text-xl font-bold mb-1">Personalise your experience</h1>
        <p class="text-sm text-gray-500 mb-5">Choose your interests.</p>

        <!-- Knowledge Domain Selection -->
        <h2 class="font-bold text-lg mb-3">Knowledge Domain</h2>
        <div class="flex flex-wrap gap-2 mb-5">
          <span *ngFor="let domain of knowledgeDomains"
                class="px-3 py-2 rounded-lg text-sm cursor-pointer"
                [ngClass]="{ 'bg-blue-600 text-white': selectedDomains.includes(domain), 'bg-blue-100 text-blue-600': !selectedDomains.includes(domain) }"
                (click)="toggleDomainSelection(domain)">
            {{ domain }}
          </span>
        </div>

        <!-- Ask Any Question -->
        <h2 class="font-bold text-lg mb-2">Ask any question</h2>
        <textarea class="w-full border rounded-md p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us everything."
                  [(ngModel)]="userQuestion"></textarea>
      </div>

      <!-- Step 3: Navigation -->
      <div *ngIf="step === 3">
        <h1 class="text-xl font-bold mb-1">Personalise your experience</h1>
        <p class="text-sm text-gray-500 mb-5">ROLES</p>

        <h2 class="font-bold text-lg mb-3">Navigation</h2>
        <div class="space-y-2">
          <div *ngFor="let item of navigationItems"
               class="p-3 rounded-md cursor-pointer flex items-center"
               [ngClass]="{ 'bg-blue-100 text-blue-700': selectedNavItem === item.name, 'hover:bg-gray-100': selectedNavItem !== item.name }"
               (click)="toggleNavigation(item)">
            <span *ngIf="selectedNavItem === item.name">▼</span>
            <span *ngIf="selectedNavItem !== item.name">▶</span>
            <span [ngClass]="{ 'line-through text-gray-500': item.disabled }">{{ item.name }}</span>
          </div>
        </div>
      </div>

      <!-- Next Button -->
      <div class="mt-6">
        <ion-buttons 
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-12 rounded-md text-center text-lg transition duration-200 shadow-xl justify-center"
          (click)="onNext()">
          Next
        </ion-buttons>
      </div>
    </div>
  `,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ExplorerSidebarComponent {
  @Input() levels: string[] = [];
  @Input() currentLevel!: number;

  // Use the interface instead of [key: string]: string
  @Input() selectedDimensions!: Dimensions;

  @Output() levelChange = new EventEmitter<number>();
  @Output() dimensionChange = new EventEmitter<{ key: string; value: string }>();

  @Output() nextStep = new EventEmitter<void>();
  @Output() completeSetup = new EventEmitter<void>();
  step: number = 1; // Track the current step


  knowledgeDomains: string[] = ["VALUE CREATION", "TRANSACTIONAL COSTS", "HUMAN RESOURCES", "PROCUREMENT PROCESS", "PRODUCTION PROCESS", "SALES PROCESS"];
  selectedDomains: string[] = [];
  userQuestion: string = '';

  // Navigation items
  navigationItems = [
    { name: "10,000 ft - SGMM Overview", disabled: false },
    { name: "5,000 ft - Environmental Spheres", disabled: false },
    { name: "1,000 ft - Interaction Issues", disabled: false },
    { name: "Ground Level - Management Practice", disabled: false }
  ];
  selectedNavItem: string | null = null;

  emitDimensionChange(key: string, value: string) {
    this.dimensionChange.emit({ key, value });
  }

  toggleDomainSelection(domain: string) {
    if (this.selectedDomains.includes(domain)) {
      this.selectedDomains = this.selectedDomains.filter(d => d !== domain);
    } else {
      this.selectedDomains.push(domain);
    }
  }

  toggleNavigation(item: any) {
    if (!item.disabled) {
      this.selectedNavItem = this.selectedNavItem === item.name ? null : item.name;
    }
  }

  onNext() {
    if (this.step < 3) {
      this.step++;
    } else {
      this.completeSetup.emit();
    }
  }
}
