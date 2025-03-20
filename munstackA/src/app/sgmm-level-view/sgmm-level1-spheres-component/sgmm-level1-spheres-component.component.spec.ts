import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SgmmLevel1SpheresComponentComponent } from './sgmm-level1-spheres-component.component';

describe('SgmmLevel1SpheresComponentComponent', () => {
  let component: SgmmLevel1SpheresComponentComponent;
  let fixture: ComponentFixture<SgmmLevel1SpheresComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SgmmLevel1SpheresComponentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SgmmLevel1SpheresComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
