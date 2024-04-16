import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IluminacionPage } from './iluminacion.page';

describe('IluminacionPage', () => {
  let component: IluminacionPage;
  let fixture: ComponentFixture<IluminacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IluminacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
