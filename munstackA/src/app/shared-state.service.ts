import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dimensions } from './sgmm-explorer/sgmm-explorer.component';

interface InputData {
  persona: string;
  market: string;
  maturityLevel: string;
  enterpriseSize: string;
  technologyAdoption: string;
  knowledgeDomain: string;
  descriptionOfDecision: string;
  level: string;
  strategiclevel: string;
  sublevel: string;
}

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

// Hardcoded example data for illustration
const DEFAULT_OUTPUT_DATA: OutputData = {
  overview: {
    model: "St. Gallen Management Model",
    context: "Medium-sized company with traditional technology adoption"
  },
  managementChallenges: [
    {
      name: "Complexity and Uncertainty",
      description: "The fast pace and complexity of quantum computing technologies introduce uncertainty in strategic decision-making.",
      strategy: "Adopt a reflective management approach that emphasizes systematic reflection and ongoing enactment of strategies."
    },
    {
      name: "Resource Allocation",
      description: "Allocating sufficient resources (financial, human, technical) to integrate quantum computing without disrupting existing operations.",
      strategy: "Use an integrative management approach to optimize value creation and facilitate resource reconfiguration."
    },
    {
      name: "Stakeholder Alignment",
      description: "Ensuring cohesion among stakeholders, such as employees, investors, and customers, when integrating new technology.",
      strategy: "Engage stakeholders in decision-making and align their interests with the organization's strategic objectives."
    }
  ],
  opportunityAreas: [
    {
      name: "Innovation and Differentiation",
      description: "Quantum computing can drive innovation and help differentiate products and services in a competitive market.",
      action: "Develop new business models and processes that leverage quantum capabilities to create unique value propositions."
    },
    {
      name: "Competitive Advantage",
      description: "Quantum computing offers potential competitive advantages in data processing and problem-solving.",
      action: "Integrate quantum technologies into strategic areas that enhance market position and operational efficiency."
    },
    {
      name: "Sustainability and Long-Term Growth",
      description: "Align quantum computing initiatives with long-term sustainability goals and market growth.",
      action: "Implement sustainable practices in technology adoption and ensure technology aligns with organizational vision and mission."
    }
  ]
};

@Injectable({
  providedIn: 'root',
})
export class SharedStateService {
  zoomIn(levels: any) {
    throw new Error('Method not implemented.');
  }
  zoomOut() {
    throw new Error('Method not implemented.');
  }
  // BehaviorSubjects hold the latest value and emit updates
  private inputObjectSubject = new BehaviorSubject<InputData | null>(null);
  private outputObjectSubject = new BehaviorSubject<OutputData>(DEFAULT_OUTPUT_DATA); // Set default

  // Expose asObservable() so consumers cannot modify the subject directly
  inputObject$ = this.inputObjectSubject.asObservable();
  outputObject$ = this.outputObjectSubject.asObservable();
  private currentLevelSubject = new BehaviorSubject<number>(0);
  currentLevel$ = this.currentLevelSubject.asObservable();

  setLevel(newLevel: number) {
    this.currentLevelSubject.next(newLevel);
  }

  getLevel(): number {
    return this.currentLevelSubject.value;
  }

  // 1) Dimensions
  private dimensionsSubject = new BehaviorSubject<Dimensions>({
    persona: 'Executive',
    market: 'Global',
    maturity: 'Growth',
    size: 'Medium',
    technology: 'Digital Native',
  });

  dimensions$ = this.dimensionsSubject.asObservable();

  // 2) Current Level
  // Getter for synchronous access
  getDimensions(): Dimensions {
    return this.dimensionsSubject.value;
  }

  getCurrentLevel(): number {
    return this.currentLevelSubject.value;
  }

  // Update dimension by key
  updateDimension(key: keyof Dimensions, value: string) {
    const dims = { ...this.dimensionsSubject.value };
    dims[key] = value;
    this.dimensionsSubject.next(dims);
  }

  // Update entire Dimensions object at once (optional)
  setDimensions(newDims: Dimensions) {
    this.dimensionsSubject.next(newDims);
  }


  

  setInputObject(data: InputData): void {
    this.inputObjectSubject.next(data);
  }

  getInputObject(): InputData | null {
    return this.inputObjectSubject.value;
  }

  setOutputObject(data: OutputData): void {
    this.outputObjectSubject.next(data);
  }

  getOutputObject(): OutputData {
    return this.outputObjectSubject.value;
  }
}