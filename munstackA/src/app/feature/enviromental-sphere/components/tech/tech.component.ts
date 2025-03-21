import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EconomyResponse} from "../../model/economy-data";

@Component({
  selector: 'app-tech',
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.scss'],
})
export class TechComponent  implements OnInit {

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
