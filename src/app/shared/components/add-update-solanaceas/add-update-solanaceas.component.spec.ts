import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AddUpdatesolanaceasComponent } from './add-update-solanaceas.component';



describe('AddUpdateSolanaceasComponent', () => {
  let component: AddUpdatesolanaceasComponent;
  let fixture: ComponentFixture<AddUpdatesolanaceasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdatesolanaceasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdatesolanaceasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
