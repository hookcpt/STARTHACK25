import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SgmmLevel0OverviewComponent } from './sgmm-level0-overview.component';

describe('SgmmLevel0OverviewComponent', () => {
  let component: SgmmLevel0OverviewComponent;
  let fixture: ComponentFixture<SgmmLevel0OverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SgmmLevel0OverviewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SgmmLevel0OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
