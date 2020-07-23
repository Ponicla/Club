import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratarServicioComponent } from './contratar-servicio.component';

describe('ContratarServicioComponent', () => {
  let component: ContratarServicioComponent;
  let fixture: ComponentFixture<ContratarServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratarServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
