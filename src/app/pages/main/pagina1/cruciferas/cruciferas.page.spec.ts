import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CruciferasPage } from './cruciferas.page';

describe('CruciferasPage', () => {
  let component: CruciferasPage;
  let fixture: ComponentFixture<CruciferasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CruciferasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
