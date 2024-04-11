import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pagina6Page } from './pagina6.page';

describe('Pagina6Page', () => {
  let component: Pagina6Page;
  let fixture: ComponentFixture<Pagina6Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Pagina6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
