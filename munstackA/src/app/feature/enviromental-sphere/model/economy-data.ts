
export interface EconomyResponse {
  strategy: EconomyStrategy;
}

export interface EconomyStrategy {
  impact: Impact[];
  vector_store_id: string;
}

export interface Impact {
  name: string;
  description: string;
  strategy: string;
}
