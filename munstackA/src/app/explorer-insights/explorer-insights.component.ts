import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

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
        </div>
        <div class="border rounded-lg p-3">
          <h3 class="font-medium text-green-700">Opportunity Areas</h3>
          <p class="text-sm mt-1">
            {{ selectedDimensions.technology }} organizations can leverage process optimization
            to enhance competitive advantage.
          </p>
        </div>
      </div>
    </div>
  `,
  imports: [CommonModule],
})
export class ExplorerInsightsComponent {
  @Input() selectedDimensions!: any;
  @Input() currentLevel!: number;
}
