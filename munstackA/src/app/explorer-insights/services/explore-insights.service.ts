import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {EconomyData} from "../../feature/enviromental-sphere/model/economy-data";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {UserData} from "../../core/model/user-data";
import {EconomyImpact} from "../../feature/enviromental-sphere/model/economy-impact";

interface OutputData {
  overview: {
    model: string;
    context: string;
  };
  managementChallenges: Array<{
    name: string;
    description: string;
    strategy: string;
  }>;
  opportunityAreas: Array<{
    name: string;
    description: string;
    action: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class ExploreInsightsService {

  private readonly apiUrl = "http://localhost:8000/enviroment_analisy-economy";
  private readonly insigthsDataSubject = new BehaviorSubject<OutputData | null>(null);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);

  // Public observables that components can subscribe to
  public insigthsData$ = this.insigthsDataSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  /**
   * Generate strategy based on input parameters
   * @param params Strategy generation parameters
   * @returns Observable of StrategyData
   */
  generateStrategy(params: UserData): Observable<OutputData> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<OutputData>(this.apiUrl, params, { headers })
      .pipe(
        tap(data => {
          this.insigthsDataSubject.next(data);
          this.loadingSubject.next(false);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Get the current strategy data
   * @returns The current strategy data or null if not loaded
   */
  getCurrentStrategyData(): OutputData | null {
    return this.insigthsDataSubject.value;
  }



  /**
   * Create a default strategy request object with empty values
   * @returns Default StrategyRequest object
   */
  createDefaultRequestParams(): UserData {
    return {
      industry: '',
      size: '',
      goal: '',
      additional_context: '',
      persona: '',
      market: '',
      technology_adoption: '',
      knowledge_domain: '',
      decision_description: ''
    };
  }

  /**
   * Reset the strategy data
   */
  resetData(): void {
    this.insigthsDataSubject.next(null);
    this.errorSubject.next(null);
  }

  /**
   * Handle HTTP errors
   * @param error The HTTP error response
   * @returns An observable that errors with user-friendly message
   */
  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    this.loadingSubject.next(false);
    this.errorSubject.next(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
