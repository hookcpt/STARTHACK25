import {Component, EventEmitter, Input, input, OnInit, Output} from '@angular/core';
import { EconomyData } from '../../model/economy-data';
import {CommonModule} from "@angular/common";



@Component({
  selector: 'app-economic',
  templateUrl: './economic.component.html',
  styleUrls: ['./economic.component.scss'],
  imports:[CommonModule]
})
export class EconomicComponent   {
  @Output() backToForm = new EventEmitter<void>();
  @Input() strategyData!: EconomyData | null;

  constructor() { }

  get impacts() {
    return this.strategyData?.strategy?.Impact || [];

  }

  goBack() {
    this.backToForm.emit();
  }
}
