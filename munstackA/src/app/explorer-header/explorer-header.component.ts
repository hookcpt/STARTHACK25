import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-explorer-header',
  imports: [CommonModule, IonicModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <!-- Back Button (left side) -->
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/" text=""></ion-back-button>
        </ion-buttons>

        <!-- Title -->
        <ion-title>SGMM Tracker</ion-title>
      </ion-toolbar>

      <!-- Segment Bar -->
      <ion-toolbar class="ion-padding-horizontal" color="light">
       <ion-segment [value]="selectedSegment" disabled="true">
  <ion-segment-button value="text">
    <ion-label>Text</ion-label>
  </ion-segment-button>
  <ion-segment-button value="five-thousand">
    <ion-label>5.000 ft</ion-label>
  </ion-segment-button>
  <ion-segment-button value="visualisation">
    <ion-label>Visualisation</ion-label>
  </ion-segment-button>
</ion-segment>
      </ion-toolbar>
    </ion-header>
  `,
})
export class ExplorerHeaderComponent {
  /**
   * Which segment is selected? Could be 'text', 'one-thousand', or 'visualisation'.
   */
  @Input() selectedSegment: string = 'visualisation';

  /**
   * Output an event whenever the segment changes.
   * The new value is emitted as a string: 'text', 'one-thousand', or 'visualisation'
   */
  @Output() segmentChanged = new EventEmitter<string>();

  onSegmentChange(event: any) {
    //this.segmentChanged.emit(event.detail.value);
  }
  @Input() currentLevel!: number;
  @Input() levels!: string[];

}
