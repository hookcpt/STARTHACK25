import {Component, EventEmitter, Input, input, OnInit, Output} from '@angular/core';
import {EconomyResponse} from '../../model/economy-data';
import {CommonModule} from "@angular/common";



@Component({
  selector: 'app-economic',
  templateUrl: './economic.component.html',
  styleUrls: ['./economic.component.scss'],
  imports:[CommonModule]
})
export class EconomicComponent implements OnInit {
  @Output() backToForm = new EventEmitter<void>();
  @Input() strategyData!: EconomyResponse | null;
  expandedimpact: boolean[] = [];
  constructor() { }

  ngOnInit(): void {
    this.initializeData()

    }

    initializeData(){
      this.expandedimpact = new Array(this.strategyData!.strategy.impact.length).fill(false);
    }
  get impacts() {
    return this.strategyData?.strategy?.impact || [];

  }
  toggleChallenge(index: number): void {
    this.expandedimpact[index] = !this.expandedimpact[index];
  }

  goBack() {
    this.backToForm.emit();
  }
}
