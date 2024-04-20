import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUpdateCruciferasComponent } from './add-update-cruciferas.component';

describe('AddUpdateCruciferasComponent', () => {
  let component: AddUpdateCruciferasComponent;
  let fixture: ComponentFixture<AddUpdateCruciferasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateCruciferasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateCruciferasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
