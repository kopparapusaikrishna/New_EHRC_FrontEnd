import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPreviousAppointmentsComponent } from './doctor-previous-appointments.component';

describe('DoctorPreviousAppointmentsComponent', () => {
  let component: DoctorPreviousAppointmentsComponent;
  let fixture: ComponentFixture<DoctorPreviousAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorPreviousAppointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorPreviousAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
