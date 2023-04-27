import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPreviousAppointmentsComponent } from './patient-previous-appointments.component';

describe('PatientPreviousAppointmentsComponent', () => {
  let component: PatientPreviousAppointmentsComponent;
  let fixture: ComponentFixture<PatientPreviousAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientPreviousAppointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientPreviousAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
