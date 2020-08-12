import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewUseradminComponent } from './modal-new-useradmin.component';

describe('ModalNewUseradminComponent', () => {
  let component: ModalNewUseradminComponent;
  let fixture: ComponentFixture<ModalNewUseradminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNewUseradminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewUseradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
