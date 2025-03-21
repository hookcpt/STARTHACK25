import { Component, OnInit } from '@angular/core';
import { SgmmLevel4ProcessService } from '../services/sgmm-level4-process.service';

@Component({
  selector: 'app-sgmm-level4-process',
  templateUrl: './sgmm-level4-process.component.html',
  styleUrls: ['./sgmm-level4-process.component.scss'],
  standalone: true
})
export class SgmmLevel4ProcessComponent implements OnInit {

  sgmmLevel4Data: any = {};
  isLoading = false;
  errorMessage = '';

  constructor(private sgmmLevel4Service: SgmmLevel4ProcessService) {}

  ngOnInit() {
    this.fetchSgmmLevel4Data();
  }

  fetchSgmmLevel4Data() {
    this.isLoading = true;
    this.errorMessage = '';

    const requestPayload = {
      industry: "Technology",
      size: "Medium",
      goal: "Operational Efficiency",
      additional_context: "Adopting new workflow automation",
      persona: "Operations Manager",
      market: "Global",
      technology_adoption: "Advanced",
      knowledge_domain: "Process Optimization",
      decision_description: "Redesigning supply chain logistics"
    };

    this.sgmmLevel4Service.getSgmmLevel4Data(requestPayload).subscribe({
      next: (response) => {
        this.sgmmLevel4Data = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching SGMM Level 4 data:', error);
        this.errorMessage = 'Failed to load data. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
