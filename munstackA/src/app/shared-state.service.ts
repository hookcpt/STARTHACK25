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
  private outputObjectSubject = new BehaviorSubject<OutputData | null>(null);

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

  getOutputObject(): OutputData | null {
    return this.outputObjectSubject.value;
  }
}




/* 
@Injectable({
  providedIn: 'root'
})
export class SharedStateService {
  // Core State Subjects
  private subjects = {
    // persona, enterprise, technology, information (all input store as observable)
    activityColumn: new BehaviorSubject<string | null>(null),
    groupColumn: new BehaviorSubject<string | null>(null),
    selectedColumn: new BehaviorSubject<string | null>(null),
    selectedTimeColumns: new BehaviorSubject<string[]>([]),
    processModel: new BehaviorSubject<any>(null),
    files: new BehaviorSubject<string[] | null>(null),
    groups: new BehaviorSubject<GroupDescriptor[]>([]),
    parsedData: new BehaviorSubject<any | null>(null),
    loading: new BehaviorSubject<boolean>(false),
    selectedPlotType: new BehaviorSubject<string>('generate-boxplot')
  };

  private submitGroupsSubject = new Subject<void>();
  submitGroups$ = this.submitGroupsSubject.asObservable();

  triggerSubmitGroups(): void {
    this.submitGroupsSubject.next();
  }

  // Plot Management
  private plotManagement: {
    [plotType: string]: {
      stack: BehaviorSubject<PlotDescriptor[]>
    }
  } = {};

  constructor() {
    // Initialize plot types
    ['generate-beanplot', 'generate-boxplot'].forEach(type => {
      this.initializePlotType(type);
    });
  }

  // Observable Accessors
  get activityCol$() { return this.subjects.activityColumn.asObservable(); }
  get groupCol$() { return this.subjects.groupColumn.asObservable(); }
  get processModel$() { return this.subjects.processModel.asObservable(); }
  get files$() { return this.subjects.files.asObservable(); }
  get groups$() { return this.subjects.groups.asObservable(); }
  get parsedData$() { return this.subjects.parsedData.asObservable(); }
  get selectedColumn$() { return this.subjects.selectedColumn.asObservable(); }
  get selectedTimeColumns$() { return this.subjects.selectedTimeColumns.asObservable(); }
  get loading$() { return this.subjects.loading.asObservable(); }
  get selectedPlotType$() { return this.subjects.selectedPlotType.asObservable(); }

  // Initialization Methods
  private initializePlotType(plotType: string) {
    this.plotManagement[plotType] = {
      stack: new BehaviorSubject<PlotDescriptor[]>([])
    };
  }

  // Column Management
  setActivityCol(column: string | null) {
    this.subjects.activityColumn.next(column);
  }

  setGroupCol(column: string | null) {
    this.subjects.groupColumn.next(column);
  }

  // Group Management
  setGroups(groups: GroupDescriptor[]) {
    const normalizedGroups = groups.map(group => {
      let normalizedFiles: string[];
  
      if (Array.isArray(group.files) && group.files.every(f => typeof f === 'string')) {
        normalizedFiles = group.files as string[];
      } else {
        normalizedFiles = (group.files as Record<string, any>[]).flatMap(obj => Object.keys(obj));
      }
  
      return { ...group, files: normalizedFiles };
    });
  
    this.subjects.groups.next(normalizedGroups);
  }
  

  updateGroupFiles(groupIndex: number, files: string[]) {
    const currentGroups = this.subjects.groups.value;
    if (currentGroups[groupIndex]) {
      currentGroups[groupIndex].files = files;
      this.setGroups([...currentGroups]);
    }
  }


  setFiles(files: string[] | Record<string, any>[]) {
    let fileNames: string[];
  
    if (Array.isArray(files) && (files as any[]).every(f => typeof f === 'string')) {
      fileNames = files as string[];
    } else {
      fileNames = (files as Record<string, any>[]).flatMap(obj => Object.keys(obj));
    }
  
    this.subjects.files.next(fileNames);
  }
  
  
  
  


  // Plot Management
  updatePlot(plotType: string, plot: PlotDescriptor, p0: any) {
    if (!this.plotManagement[plotType]) {
      this.initializePlotType(plotType);
    }

    const currentPlots = this.plotManagement[plotType].stack.value;
    this.plotManagement[plotType].stack.next([...currentPlots, plot]);
  }

  removePlot(plotType: string, index: number) {
    if (this.plotManagement[plotType]) {
      const currentPlots = this.plotManagement[plotType].stack.value;
      currentPlots.splice(index, 1);
      this.plotManagement[plotType].stack.next([...currentPlots]);
    }
  }

  getPlotStack$(plotType: string): Observable<PlotDescriptor[]> {
    if (!this.plotManagement[plotType]) {
      this.initializePlotType(plotType);
    }
    return this.plotManagement[plotType].stack.asObservable();
  }

  // State Getters (for direct value access)
  getActivityCol(): string | null {
    return this.subjects.activityColumn.value;
  }

  getGroupCol(): string | null {
    return this.subjects.groupColumn.value;
  }

  getGroups(): GroupDescriptor[] {
    return this.subjects.groups.value;
  }

  getFiles(): string[] | null {
    return this.subjects.files.value;
  }

  getParsedData(): any {
    return this.subjects.parsedData.value;
  }
  getSelectedPlotType():string|null {
    return this.subjects.selectedPlotType.value;
  }
  getSelectedColumn():string|null {
    return this.subjects.selectedColumn.value;
  }
  getSelectedTimeColumns():string[]|null {
    return this.subjects.selectedTimeColumns.value;
  }

  // Additional State Setters
  setSelectedColumn(column: string) {
    this.subjects.selectedColumn.next(column);
  }

  setSelectedTimeColumns(columns: string[]) {
    this.subjects.selectedTimeColumns.next(columns);
  }

  setParsedData(data: any) {
    this.subjects.parsedData.next(data);
  }

  setLoading(isLoading: boolean) {
    this.subjects.loading.next(isLoading);
  }

  setSelectedPlotType(plotType: string) {
    this.subjects.selectedPlotType.next(plotType);
  }

  updateProcessModel(data: any) {
    this.subjects.processModel.next(data);
  }

  // Utility Methods
  reset() {
    Object.values(this.subjects).forEach(subject => subject.next(null));
    Object.values(this.plotManagement).forEach(plot => plot.stack.next([]));
  }
}


*/