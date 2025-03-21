import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedStateService } from './shared-state.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://0.0.0.0:8080/api'; // Define API URL in environment file

  constructor(private http: HttpClient, private sharedService: SharedStateService) {}

  /*
  Method:
  Generate 10000ft SGMM Overview

  - Fetch object vom shared service input
  - Convert object to json
  - Send json to backend API
  - Receive json from backend API
  - Convert json to object
  - Store object in shared service output 

  */
  generate10000ftSGMMOverview(): void {
    // Fetch input object from shared service
    const inputObject = this.sharedService.getInputObject();

    if (!inputObject) {
      console.error('No input object available.');
      return;
    }

    // Send JSON data to backend API
    this.http.post(`${this.apiUrl}/generate10000ftSGMMOverview`, inputObject)
      .subscribe(
        (response: any) => {
          // Store output in shared service
          this.sharedService.setOutputObject(response);
        },
        (error) => {
          console.error('Error generating overview:', error);
        }
      );
  }


  // Other API methods can be added here
    
  /*
  Method: 
  Generate 5000ft Environmental Spheres

  */
}
