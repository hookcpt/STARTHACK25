import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SgmmLevel3Service {

  private apiUrl = 'https://your-api-endpoint.com/sgmm-data'; // Replace with your real API endpoint

  constructor(private http: HttpClient) {}

  // Function to fetch data from API
  getSgmmData(params: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.apiUrl, params, { headers });
  }
}
