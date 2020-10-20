import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionPagoErrorComponent } from './devolucion-pago-error.component';

describe('DevolucionPagoErrorComponent', () => {
  let component: DevolucionPagoErrorComponent;
  let fixture: ComponentFixture<DevolucionPagoErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolucionPagoErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionPagoErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
