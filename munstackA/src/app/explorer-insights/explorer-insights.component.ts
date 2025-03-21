import { CommonModule } from "@angular/common";
import {Component, Input, OnInit} from "@angular/core";
import { SharedStateService } from "../shared-state.service";
import { IonicModule } from "@ionic/angular"
import {ExploreInsightsService} from "./services/explore-insights.service";
import {UserData} from "../core/model/user-data";

@Component({
  standalone: true,
  selector: "app-explorer-insights",
  template: `
    <div class="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 class="font-bold text-lg mb-4">Insights & Recommendations</h2>
      <p class="text-sm text-gray-600 mb-5">
        Based on your selected dimensions and current view level, here are some tailored insights:
      </p>

      <div class="grid md:grid-cols-2 gap-6">

        <!-- Management Challenges -->
        <div class="border rounded-lg p-4 bg-blue-50 shadow-sm">
          <h3 class="font-semibold text-blue-700 text-lg mb-3">Management Challenges</h3>
          <ul class="space-y-3">
            <li *ngFor="let challenge of managementChallenges; let i = index"
                class="p-3 bg-white rounded-md shadow hover:shadow-lg transition cursor-pointer">
              <div class="flex justify-between items-center" (click)="toggleChallenge(i)">
                <h4 class="font-medium text-blue-600">{{ challenge.name }}</h4>
                <span class="text-blue-600 font-bold text-lg">{{ expandedChallenges[i] ? '−' : '+' }}</span>
              </div>
              <div *ngIf="expandedChallenges[i]" class="mt-2 p-3 bg-gray-100 rounded-md">
                <p class="text-sm text-gray-800">{{ challenge.description }}</p>
                <p class="text-xs text-gray-500 italic mt-2">Strategy: {{ challenge.strategy }}</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Opportunity Areas -->
        <div class="border rounded-lg p-4 bg-green-50 shadow-sm">
          <h3 class="font-semibold text-green-700 text-lg mb-3">Opportunity Areas</h3>
          <ul class="space-y-3">
            <li *ngFor="let opportunity of opportunityAreas; let i = index"
                class="p-3 bg-white rounded-md shadow hover:shadow-lg transition cursor-pointer">
              <div class="flex justify-between items-center" (click)="toggleOpportunity(i)">
                <h4 class="font-medium text-green-600">{{ opportunity.name }}</h4>
                <span class="text-green-600 font-bold text-lg">{{ expandedOpportunities[i] ? '−' : '+' }}</span>
              </div>
              <div *ngIf="expandedOpportunities[i]" class="mt-2 p-3 bg-gray-100 rounded-md">
                <p class="text-sm text-gray-800">{{ opportunity.description }}</p>
                <p class="text-xs text-gray-500 italic mt-2">Action: {{ opportunity.action }}</p>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  `,
  imports: [CommonModule, IonicModule],
})
export class ExplorerInsightsComponent implements OnInit{
  @Input() selectedDimensions!: any;
  @Input() currentLevel!: number;

  managementChallenges: any[] = [];
  opportunityAreas: any[] = [];
  expandedChallenges: boolean[] = [];
  expandedOpportunities: boolean[] = [];

  constructor(private sharedStateService: ExploreInsightsService) {}

  ngOnInit(): void {
    const userData: UserData = {
      industry: "Technology",
      size: "Medium",
      goal: "Growth",
      additional_context: "Looking to expand into new markets",
      persona: "CEO",
      market: "Global",
      technology_adoption: "High",
      knowledge_domain: "Software",
      decision_description: "Digital transformation initiative"
    };

    this.sharedStateService.generateStrategy(userData).subscribe(outputData => {
      if (outputData) {
        this.managementChallenges = outputData.managementChallenges;
        this.opportunityAreas = outputData.opportunityAreas;
        this.expandedChallenges = new Array(outputData.managementChallenges.length).fill(false);
        this.expandedOpportunities = new Array(outputData.opportunityAreas.length).fill(false);
      }
    });
  }

  toggleChallenge(index: number): void {
    this.expandedChallenges[index] = !this.expandedChallenges[index];
  }

  toggleOpportunity(index: number): void {
    this.expandedOpportunities[index] = !this.expandedOpportunities[index];
  }
}
