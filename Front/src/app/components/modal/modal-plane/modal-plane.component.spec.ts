import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlaneComponent } from './modal-plane.component';

describe('ModalPlaneComponent', () => {
  let component: ModalPlaneComponent;
  let fixture: ComponentFixture<ModalPlaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPlaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPlaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
