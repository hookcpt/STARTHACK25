import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sgmm-level2-stakeholders',
  templateUrl: './sgmm-level2-stakeholders.component.html',
  styleUrls: ['./sgmm-level2-stakeholders.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class SgmmLevel2StakeholdersComponent  implements OnInit {

  @Input() selectedDimensions!: { size: string; market: string; maturity: string; technology: string };

  @Output() zoomIn = new EventEmitter<void>(); // Allow zoom in to next level

  constructor() { }

  ngOnInit() {}

}
