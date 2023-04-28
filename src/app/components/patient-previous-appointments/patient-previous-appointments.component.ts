import { Component, OnInit } from '@angular/core';
import { Prev_appointments } from 'src/app/models/prev-appointments';
import { PatientService } from 'src/app/services/patient.service';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-patient-previous-appointments',
  templateUrl: './patient-previous-appointments.component.html',
  styleUrls: ['./patient-previous-appointments.component.css']
})
export class PatientPreviousAppointmentsComponent implements OnInit {
  prevAppointmentsLst: Array<Prev_appointments>;
  consultAgainLst: Array<string>;
  patient_details:any;

  constructor(private patientService: PatientService, private pdfService: PdfService) { 
    this.prevAppointmentsLst = new Array<Prev_appointments>;
    this.getPatientDetails();
    this.getPreviousAppointments();

    this.consultAgainLst = new Array(this.prevAppointmentsLst.length);
  }

  ngOnInit(): void {
  }

  getPreviousAppointments(){
    this.patientService.getPreviousAppointments(this.patient_details.patientId)
    .subscribe({
      next: (data: any) => {
        console.log(data);
        this.prevAppointmentsLst = data;
        console.log(this.prevAppointmentsLst);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  getPatientDetails(){
    console.log(localStorage.getItem("patient_details"));
    this.patient_details = JSON.parse( localStorage.getItem("patient_details")!);
    console.log("Sfdgsfh");
    console.log(this.patient_details);
    
   }

  followUpAppointment(index: number): void {
    console.log("Consult clicked" + this.consultAgainLst[index]);
    if(this.consultAgainLst[index] != "Same Doctor" || this.consultAgainLst[index] != "Different Doctor") {
      alert("Select an option")
    }
  }

  getPrescription(appointmentId: number){
    console.log(appointmentId);

  this.pdfService.generatePrescription(appointmentId).subscribe(response => {
    console.log(response);
    console.log(response.headers.get('content-disposition'));
    // let fileName = response.headers.get('content-disposition')!.split(';')[1].split('=')[1];
    let fileName = "prescription.pdf";
    let blob:Blob = response.body as Blob;
    let a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    a.click();
  })
  }
}
