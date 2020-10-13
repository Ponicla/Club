import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPaseosComponent } from './mis-paseos.component';

describe('MisPaseosComponent', () => {
  let component: MisPaseosComponent;
  let fixture: ComponentFixture<MisPaseosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisPaseosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisPaseosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
