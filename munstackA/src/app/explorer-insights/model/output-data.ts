// api-response.model.ts

// This interface represents the top-level response structure
export interface ApiResponse {
  strategy: Strategy;
}

// The Strategy interface as you initially defined it
export interface Strategy {
  overview: Overview;
  managementChallenges: ManagementChallenge[];
  opportunityAreas: OpportunityArea[];
  vector_store_id: string;
}

export interface Overview {
  model: string;
  context: string;
}

export interface ManagementChallenge {
  name: string;
  description: string;
  strategy: string;
}

export interface OpportunityArea {
  name: string;
  description: string;
  action: string;
}
