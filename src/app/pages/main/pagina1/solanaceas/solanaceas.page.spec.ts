import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolanaceasPage } from './solanaceas.page';

describe('SolanaceasPage', () => {
  let component: SolanaceasPage;
  let fixture: ComponentFixture<SolanaceasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SolanaceasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
