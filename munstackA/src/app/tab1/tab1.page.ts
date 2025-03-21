import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { SgmmExplorerComponent } from '../sgmm-explorer/sgmm-explorer.component';
import {EnviromentalSphereComponent} from "../feature/enviromental-sphere/enviromental-sphere.component";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, SgmmExplorerComponent],
})
export class Tab1Page {
  constructor() {}
}
