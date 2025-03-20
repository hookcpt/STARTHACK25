import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Dimensions {
  persona: string;
  market: string;
  maturity: string;
  size: string;
  technology: string;
}


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

// Example default data
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

  // BehaviorSubjects for input/output data
  private inputObjectSubject = new BehaviorSubject<InputData | null>(null);
  private outputObjectSubject = new BehaviorSubject<OutputData>(DEFAULT_OUTPUT_DATA);

  // Observables for external subscription
  inputObject$ = this.inputObjectSubject.asObservable();
  outputObject$ = this.outputObjectSubject.asObservable();

  // ------------------------------------------------------
  // Input/Output data
  // ------------------------------------------------------
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
  

/////////////

  // Manage current level (e.g., 0, 1, 2...)
  private currentLevelSubject = new BehaviorSubject<number>(0);
  currentLevel$ = this.currentLevelSubject.asObservable();

    /**
   * Selected Dimensions (persona, market, etc.).
   */
    private dimensionsSubject = new BehaviorSubject<Dimensions>({
      persona: 'Executive',
      market: 'Global',
      maturity: 'Growth',
      size: 'Medium',
      technology: 'Digital Native',
    });
    dimensions$ = this.dimensionsSubject.asObservable();

  levels!: string[];


  // ------------------------------------------------------
  // Dimensions
  // ------------------------------------------------------
  /**
   * A simple array of level names (0..n).
   * If you want more dynamic logic, you can expand this later.
   */
  private readonly levelsArray = [
    '10,000 ft - SGMM Overview',
    '5,000 ft - Environmental Spheres',
    '2,500 ft - Stakeholders',
    '1,000 ft - Interaction Issues',
    '500 ft - Processes',
    'Ground Level - Management Practice',
  ];


  // -----------------------------------------------------
  // Levels
  // -----------------------------------------------------
  getLevels(): string[] {
    return this.levelsArray;
  }

  getCurrentLevel(): number {
    return this.currentLevelSubject.value;
  }

  setLevel(newLevel: number) {
    console.log('SharedStateService: setLevel called with', newLevel);
    this.currentLevelSubject.next(newLevel);
  }
  

  // -----------------------------------------------------
  // Dimensions
  // -----------------------------------------------------
  getDimensions(): Dimensions {
    return this.dimensionsSubject.value;
  }

  updateDimension(key: keyof Dimensions, value: string) {
    const dims = { ...this.dimensionsSubject.value };
    dims[key] = value;
    this.dimensionsSubject.next(dims);
  }

  // Example: Zoom in if we have a "levels" array in the parent
  zoomIn(levels: string[]) {
    const curr = this.currentLevelSubject.value;
    if (curr < levels.length - 1) {
      this.currentLevelSubject.next(curr + 1);
    }
  }

  // Example: Zoom out if current > 0
  zoomOut() {
    const curr = this.currentLevelSubject.value;
    if (curr > 0) {
      this.currentLevelSubject.next(curr - 1);
    }
  }
}
