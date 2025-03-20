import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { SharedStateService } from "../shared-state.service";

@Component({
  standalone: true,
  selector: 'app-explorer-insights',
  template: `
    <div class="mt-6 bg-white p-4 rounded-lg shadow-md">
      <h2 class="font-bold text-lg mb-3">Insights & Recommendations</h2>
      <p class="text-sm text-gray-600 mb-3">
        Based on your selected dimensions and current view level, here are some tailored insights:
      </p>
      
      <div class="grid grid-cols-2 gap-4">
        <div class="border rounded-lg p-3">
          <h3 class="font-medium text-blue-700">Management Challenges</h3>
          <p class="text-sm mt-1">
            {{ selectedDimensions.maturity }} stage companies in {{ selectedDimensions.market }} markets
            typically face coordination challenges across multiple stakeholder groups.
          </p>
          <ul class="space-y-3">
            <li *ngFor="let challenge of managementChallenges" class="p-3 bg-white rounded-md shadow">
              <h4 class="font-medium text-blue-600">{{ challenge.name }}</h4>
              <p class="text-sm text-gray-700">{{ challenge.description }}</p>
              <p class="text-xs text-gray-500 italic">Strategy: {{ challenge.strategy }}</p>
            </li>
          </ul>
        </div>


        <div class="border rounded-lg p-3">
          <h3 class="font-medium text-green-700">Opportunity Areas</h3>
          <p class="text-sm mt-1">
            {{ selectedDimensions.technology }} organizations can leverage process optimization
            to enhance competitive advantage.
          </p>
          <ul class="space-y-3">
            <li *ngFor="let opportunity of opportunityAreas" class="p-3 bg-white rounded-md shadow">
              <h4 class="font-medium text-green-600">{{ opportunity.name }}</h4>
              <p class="text-sm text-gray-700">{{ opportunity.description }}</p>
              <p class="text-xs text-gray-500 italic">Action: {{ opportunity.action }}</p>
            </li>
          </ul>
        </div>


      </div>
    </div>
  `,
  imports: [CommonModule],
})
export class ExplorerInsightsComponent {
  @Input() selectedDimensions!: any;
  @Input() currentLevel!: number;

  managementChallenges: any[] = [];
  opportunityAreas: any[] = [];

  constructor(private sharedStateService: SharedStateService) {}

  ngOnInit(): void {
    // Subscribe to data changes from SharedStateService
    this.sharedStateService.outputObject$.subscribe(outputData => {
      if (outputData) {
        this.managementChallenges = outputData.managementChallenges;
        this.opportunityAreas = outputData.opportunityAreas;
      }
    });
  }
}
