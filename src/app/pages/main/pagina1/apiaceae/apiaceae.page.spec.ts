import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiaceaePage } from './apiaceae.page';

describe('ApiaceaePage', () => {
  let component: ApiaceaePage;
  let fixture: ComponentFixture<ApiaceaePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApiaceaePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
