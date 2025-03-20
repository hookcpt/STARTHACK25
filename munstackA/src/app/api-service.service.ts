import { SharedStateService } from './shared-state.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * 
 * @param sharedStateService based on the interface and methods
 * @param activityId 
 * @param minCount 
 * @param minPercentage 
 * @returns 
 */
export function prepareRequestData(
  sharedStateService: SharedStateService,
  activity?: string | { source: string; target: string }, // Can be a single activityId or an edge object
  minCount?: number,
  minPercentage?: number
): any {
  const time = sharedStateService.getSelectedTimeColumns()

  const files = sharedStateService.getFiles();
  const groups = sharedStateService.getGroups(); 
  // Assume this returns the list of groups in the form [{ name: string, files: string[] }]
  const selectedTime = time? time.length > 0 : false;

  console.log('Current selected time columns:', selectedTime);

  let requestData: any = {
    filenames: files,
    group_col: sharedStateService.getSelectedColumn() || '',
    activity_col: sharedStateService.getActivityCol() || undefined,
    min_count: minCount || undefined,
    min_percentage: minPercentage || undefined,
    groups: groups || undefined,
  };

  if (selectedTime && time) {
    requestData.start_col = time[0] || 'case:startdate';
    requestData.end_col =
      time.length >= 2 ? time[1]
        : 'case:enddate_planned';
  }

  if (typeof activity === 'string') {
    // For a single node activity
    requestData.activity = activity;
  } else if (activity && typeof activity === 'object' && activity.source && activity.target) {
    // For an edge (source-target pair)
    requestData.source = activity.source;
    requestData.target = activity.target;
  }

  return requestData;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  analyzeEventLog(filenames: string[], groupColumn:string): Observable<any> {
    const formData = new FormData();
    //formData.append('filenames', filenames);
    return this.http.get(`${this.SERVER_URL}/analyze-parquet?filenames=`
      +JSON.stringify(filenames)
    + '&group_by_column='+JSON.stringify(groupColumn) );
  }

  private PROXY_URL = 'https://sponge-bubble-jet.glitch.me/'
  //private  SERVER_URL = this.PROXY_URL + 'https://ba-pads-yf5xzaxphq-ew.a.run.app'
  //public SERVER_URL = this.PROXY_URL + 'https://multipmbackend.onrender.com/api' 
  public SERVER_URL = 'http://0.0.0.0:8080/api'

  
  constructor(private http: HttpClient, private sharedState: SharedStateService) {
    this.socket = new WebSocket('ws://localhost:8080/ws'); // Replace with your WebSocket server URL

    this.socket.onmessage = (event) => {
      this.subject.next(event.data); // Pass the received data to the subject
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  private socket: WebSocket;
  private subject: Subject<string> = new Subject<string>();

  getMessages(): Observable<string> {
    return this.subject.asObservable(); // Return the subject as an observable
  }

  closeConnection(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  fetchColumns(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.SERVER_URL}/extract_columns`, formData).pipe(
      map(response => {
        // Assuming response is in the correct format
        return response;
      })
    );
  }

  // Helper function to convert data object to FormData
 objectToFormData(data: any): FormData {
  const formData = new FormData();

  for (const key in data) {
    if (data.hasOwnProperty(key) && data[key] !== undefined && data[key] !== null) {
      if (Array.isArray(data[key]) || typeof data[key] === 'object') {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    }
  }

  return formData;
}


generateProcessModel(data: any): Observable<any> {
  const formData = this.objectToFormData(data);

  const res = !(data.start_col && data.end_col)
    ? this.http.post(`${this.SERVER_URL}/state_occurrences`, formData)
    : this.http.post(`${this.SERVER_URL}/process_model`, formData);

  return res.pipe(
    map(response => {
      return response;
    }),
    catchError(error => {
      console.error('Error generating process model:', error);
      return throwError(error);
    })
  );
}

generateHeatplot(endpoint: string, edges: any){
    return this.http.post<{ heatmap_image: string }>(this.SERVER_URL+endpoint, edges)
}

generatePlot(data: any, endpoint: 'generate-boxplot' | 'generate-beanplot'): Observable<any> {
  this.sharedState.setLoading(true);

  const formData = this.objectToFormData(data);

  // Special handling for the file, since it may need to be treated differently
  if (data.file instanceof Blob) {
    formData.append('file', data.file, data.filename || data.file.name);
  } else if (typeof data.file === 'string') {
    formData.append('filename', data.file);
  } else {
    console.error('Invalid file type');
    this.sharedState.setLoading(false);
    return throwError('Invalid file type');
  }

  return this.http.post(`${this.SERVER_URL}/${endpoint}`, formData).pipe(
    map(response => {
      this.sharedState.setLoading(false);
      return response;
    }),
    catchError(error => {
      this.sharedState.setLoading(false);
      console.error(`Error generating plot from ${endpoint}:`, error);
      return throwError(error);
    })
  );
}

}
