import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SgmmLevel4ProcessService {

  private apiUrl = 'https://your-api-endpoint.com/sgmm-level4'; // Replace with actual API endpoint

  constructor(private http: HttpClient) {}

  // Function to fetch Level 4 process data
  getSgmmLevel4Data(params: {
    industry: string;
    size: string;
    goal: string;
    additional_context: string;
    persona: string;
    market: string;
    technology_adoption: string;
    knowledge_domain: string;
    decision_description: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, params, { headers });
  }
}
