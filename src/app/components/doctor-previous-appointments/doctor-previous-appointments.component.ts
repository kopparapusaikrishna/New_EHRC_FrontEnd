import { Component, OnInit } from '@angular/core';
import { Doctor_Prev_appointments } from 'src/app/models/doctor-prev-appointments';

@Component({
  selector: 'app-doctor-previous-appointments',
  templateUrl: './doctor-previous-appointments.component.html',
  styleUrls: ['./doctor-previous-appointments.component.css']
})
export class DoctorPreviousAppointmentsComponent implements OnInit {

  prevAppointmentsLst: Array<Doctor_Prev_appointments>;

  constructor() { 
    const prev1: Doctor_Prev_appointments = {
      appointment_date: '12-09-2001',
      patient_name: 'Hitesh',
      follow_up: true,
      appointment_id: 1
    };

    const prev2: Doctor_Prev_appointments = {
      appointment_date: '29-07-2020',
      patient_name: 'Naveen',
      follow_up: false,
      appointment_id: 2
    };

    this.prevAppointmentsLst = [prev1, prev2];
  }

  ngOnInit(): void {
  }

}
