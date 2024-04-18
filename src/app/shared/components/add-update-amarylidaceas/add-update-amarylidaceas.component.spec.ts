import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUpdateAmarylidaceasComponent } from './add-update-amarylidaceas.component';

describe('AddUpdateAmarylidaceasComponent', () => {
  let component: AddUpdateAmarylidaceasComponent;
  let fixture: ComponentFixture<AddUpdateAmarylidaceasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateAmarylidaceasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateAmarylidaceasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
