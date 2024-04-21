import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUpdateCucurbitaceasComponent } from './add-update-cucurbitaceas.component';

describe('AddUpdateCucurbitaceasComponent', () => {
  let component: AddUpdateCucurbitaceasComponent;
  let fixture: ComponentFixture<AddUpdateCucurbitaceasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateCucurbitaceasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateCucurbitaceasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
