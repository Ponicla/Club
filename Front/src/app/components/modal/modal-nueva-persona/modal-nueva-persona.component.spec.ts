import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNuevaPersonaComponent } from './modal-nueva-persona.component';

describe('ModalNuevaPersonaComponent', () => {
  let component: ModalNuevaPersonaComponent;
  let fixture: ComponentFixture<ModalNuevaPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNuevaPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNuevaPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
