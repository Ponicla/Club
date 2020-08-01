import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionPagoComponent } from './devolucion-pago.component';

describe('DevolucionPagoComponent', () => {
  let component: DevolucionPagoComponent;
  let fixture: ComponentFixture<DevolucionPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolucionPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
