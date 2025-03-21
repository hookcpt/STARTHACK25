import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

import {ExplorerInsightsComponent} from "../explorer-insights/explorer-insights.component";

@Component({
  standalone:true,
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExplorerInsightsComponent],
})
export class Tab1Page {
  constructor() {}
}
