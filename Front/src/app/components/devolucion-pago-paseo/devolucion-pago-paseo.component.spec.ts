import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionPagoPaseoComponent } from './devolucion-pago-paseo.component';

describe('DevolucionPagoPaseoComponent', () => {
  let component: DevolucionPagoPaseoComponent;
  let fixture: ComponentFixture<DevolucionPagoPaseoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolucionPagoPaseoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionPagoPaseoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
