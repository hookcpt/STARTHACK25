import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {EnviromentalSphereService} from "./services/enviromental-sphere.service";
import { UserData } from 'src/app/core/model/user-data';
import {CommonModule} from "@angular/common";
import {EconomicComponent} from "./components/economic/economic.component";

import {animate, state, style, transition, trigger} from "@angular/animations";
import {EconomyResponse} from "./model/economy-data";

@Component({
  imports: [
    CommonModule,
    EconomicComponent
    // Add this import
  ],
  selector: 'app-enviromental-sphere',
  styleUrls: ['./enviromental-sphere.component.scss'],
  templateUrl: './enviromental-sphere.component.html',
  animations: [
    trigger('slideAnimation', [
      state('initial', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      state('goingDeeper', style({
        transform: 'translateY(-100%)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      transition('initial => goingDeeper', animate('500ms ease-in')),
      transition('hidden => visible', animate('500ms ease-out')),
      transition('visible => hidden', animate('500ms ease-in')),
    ])
  ]
})
export class EnviromentalSphereComponent  implements OnInit, OnDestroy {
  strategyData: EconomyResponse | null = null;
  loading = false;
  error: string | null = null;
  showResults = false;
  animationState = 'initial'
  private readonly subscription = new Subscription();

  constructor(private readonly enviromentalSphereService: EnviromentalSphereService) {
  }

  ngOnInit(): void {
    // Subscribe to loading state
    this.subscription.add(
      this.enviromentalSphereService.loading$.subscribe(loading => {
        this.loading = loading;
      })
    );

    // Subscribe to error state
    this.subscription.add(
      this.enviromentalSphereService.error$.subscribe(error => {
        this.error = error;
      })
    );

    // Subscribe to strategy data
    this.subscription.add(
      this.enviromentalSphereService.strategyData$.subscribe(data => {
        if (data) {
          this.strategyData = data;
          this.processStrategyData(data);
        }
      })
    );
  }

  /**
   * Call the generate strategy function with sample user data
   */
  callGenerateStrategy(): void {
    // Create sample user data - replace with your actual data structure
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

    // Call the service method and subscribe to the result
    this.enviromentalSphereService.generateStrategy(userData).subscribe({
      next: (result) => {
        console.log('OutputData generation successful', result);
        this.animationState = 'goingDeeper';

        // Wait for animation to complete before showing results
        setTimeout(() => {
          this.showResults = true;
          this.animationState = 'visible';
        }, 500);
        // The subscription above will handle updating the UI
      },
      error: (err) => {
        console.error('Error calling generateStrategy:', err);
        // The error subscription above will handle displaying the error
      }
    });
  }

  /**
   * Process the strategy data for display or further use
   * @param data The strategy data returned from the API
   */
  private processStrategyData(data: EconomyResponse): void {
    // Add any additional processing logic here
    console.log('Processing strategy data:', data.strategy);

    // Example: Extract specific data points or transform data
    if (data.strategy && data.strategy.impact) {
      const impacts = data.strategy.impact;
      console.log(`Found ${impacts?.length || 0} impact items`);
    }
  }

  ngOnDestroy(): void {
    // Clean up subscriptions to prevent memory leaks
    this.subscription.unsubscribe();
  }
  showFormAgain() {
    this.animationState = 'hidden';

    // Wait for animation to complete before hiding results
    setTimeout(() => {
      this.showResults = false;
      this.animationState = 'initial';
    }, 500);
  }

  dismissError() {
    this.error = null;
  }
}
