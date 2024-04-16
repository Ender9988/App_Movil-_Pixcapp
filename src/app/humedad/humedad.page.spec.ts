import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HumedadPage } from './humedad.page';

describe('HumedadPage', () => {
  let component: HumedadPage;
  let fixture: ComponentFixture<HumedadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HumedadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
