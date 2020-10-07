import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionPagoServicioComponent } from './devolucion-pago-servicio.component';

describe('DevolucionPagoServicioComponent', () => {
  let component: DevolucionPagoServicioComponent;
  let fixture: ComponentFixture<DevolucionPagoServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolucionPagoServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionPagoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
