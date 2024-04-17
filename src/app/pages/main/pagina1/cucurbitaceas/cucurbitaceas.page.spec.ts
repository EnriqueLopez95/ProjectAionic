import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CucurbitaceasPage } from './cucurbitaceas.page';

describe('CucurbitaceasPage', () => {
  let component: CucurbitaceasPage;
  let fixture: ComponentFixture<CucurbitaceasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CucurbitaceasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
