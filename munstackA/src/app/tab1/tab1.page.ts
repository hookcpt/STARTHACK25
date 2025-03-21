import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

import {ExplorerInsightsComponent} from "../explorer-insights/explorer-insights.component";
import {EnviromentalSphereComponent} from "../feature/enviromental-sphere/enviromental-sphere.component";


@Component({
  standalone:true,
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, EnviromentalSphereComponent],
})
export class Tab1Page {
  constructor() {}
}
