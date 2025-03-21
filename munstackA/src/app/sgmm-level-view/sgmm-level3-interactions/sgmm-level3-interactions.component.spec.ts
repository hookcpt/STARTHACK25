import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SgmmLevel3InteractionsComponent } from './sgmm-level3-interactions.component';

describe('SgmmLevel3InteractionsComponent', () => {
  let component: SgmmLevel3InteractionsComponent;
  let fixture: ComponentFixture<SgmmLevel3InteractionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SgmmLevel3InteractionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgmmLevel3InteractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
