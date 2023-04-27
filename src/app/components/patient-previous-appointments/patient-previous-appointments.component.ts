import { Component, OnInit } from '@angular/core';
import { Prev_appointments } from 'src/app/models/prev-appointments';

@Component({
  selector: 'app-patient-previous-appointments',
  templateUrl: './patient-previous-appointments.component.html',
  styleUrls: ['./patient-previous-appointments.component.css']
})
export class PatientPreviousAppointmentsComponent implements OnInit {
  prevAppointmentsLst: Array<Prev_appointments>;
  consultAgainLst: Array<string>;

  constructor() { 
    const prev1: Prev_appointments = {
      appointment_date: '12-09-2001',
      doctor_dept: 'Orthopedic',
      doctor_name: 'Naveen',
      appointment_id: 1
    };

    const prev2: Prev_appointments = {
      appointment_date: '29-07-2020',
      doctor_dept: 'ENT',
      doctor_name: 'Hitesh',
      appointment_id: 2
    };

    this.prevAppointmentsLst = [prev1, prev2];

    this.consultAgainLst = new Array(this.prevAppointmentsLst.length);
  }

  ngOnInit(): void {
  }

  followUpAppointment(index: number): void {
    console.log("Consult clicked" + this.consultAgainLst[index]);
    if(this.consultAgainLst[index] != "Same Doctor" || this.consultAgainLst[index] != "Different Doctor") {
      alert("Select an option")
    }
  }
}
