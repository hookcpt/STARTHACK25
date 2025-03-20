import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface SelectedDimensions {
  persona: string;
  market: string;
  maturity: string;
  size: string;
  technology: string;
}

@Component({
  selector: 'app-sgmm-explorer',
  templateUrl: './sgmm-explorer.component.html',
  styleUrls: ['./sgmm-explorer.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    // any other modules/components you need
  ],
})
export class SGMMExplorerComponent implements OnInit {
  currentLevel = 0;
  selectedDimensions: SelectedDimensions = {
    persona: 'Executive',
    market: 'Global',
    maturity: 'Growth',
    size: 'Medium',
    technology: 'Digital Native'
  };
  
  levels = [
    "10,000 ft - SGMM Overview", 
    "5,000 ft - Environmental Spheres", 
    "2,500 ft - Stakeholders",
    "1,000 ft - Interaction Issues",
    "500 ft - Processes",
    "Ground Level - Management Practice"
  ];

  constructor() { }

  ngOnInit(): void {
  }

  zoomIn(): void {
    if (this.currentLevel < this.levels.length - 1) {
      this.currentLevel++;
    }
  }
  
  zoomOut(): void {
    if (this.currentLevel > 0) {
      this.currentLevel--;
    }
  }

  setLevel(index: number): void {
    this.currentLevel = index;
  }

  updateDimension(dimension: string, value: string): void {
    this.selectedDimensions = {
      ...this.selectedDimensions,
      [dimension]: value
    };
  }
}