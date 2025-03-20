import {EconomyImpact} from "./economy-impact";

export interface EconomyData {
  strategy: {
    Overview: {
      context: string;
      challenge: string;
    };
    Impact: EconomyImpact[];

    vector_store_id: string;
  };
}
