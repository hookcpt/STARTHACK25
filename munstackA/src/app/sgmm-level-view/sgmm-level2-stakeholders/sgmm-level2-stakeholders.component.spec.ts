import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SgmmLevel2StakeholdersComponent } from './sgmm-level2-stakeholders.component';

describe('SgmmLevel2StakeholdersComponent', () => {
  let component: SgmmLevel2StakeholdersComponent;
  let fixture: ComponentFixture<SgmmLevel2StakeholdersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SgmmLevel2StakeholdersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgmmLevel2StakeholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
