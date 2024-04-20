import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUpdateApiaceaeComponent } from './add-update-apiaceae.component';

describe('AddUpdateApiaceaeComponent', () => {
  let component: AddUpdateApiaceaeComponent;
  let fixture: ComponentFixture<AddUpdateApiaceaeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateApiaceaeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateApiaceaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
