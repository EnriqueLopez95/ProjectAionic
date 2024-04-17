import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmarylidaceasPage } from './amarylidaceas.page';

describe('AmarylidaceasPage', () => {
  let component: AmarylidaceasPage;
  let fixture: ComponentFixture<AmarylidaceasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AmarylidaceasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
