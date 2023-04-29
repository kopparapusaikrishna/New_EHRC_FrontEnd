import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { PdfService } from 'src/app/services/pdf.service';
import { Router } from '@angular/router';
import { FollowUp } from 'src/app/models/follow-up.model';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
 previous_appointments=true
 patient_id: number = -1;
 patient_details:any;
  constructor(private router: Router,private patientservice:PatientService, private pdfService: PdfService) { 
    this.getPatientDetails();
  }

  ngOnInit(): void {
   
  }

  w3_close() {
    var box = document.getElementsByClassName("w3-sidenav") as unknown as HTMLCollectionOf<HTMLElement>;
    box[0].style.display="None"
   
  }
  w3_open() {
    var box = document.getElementsByClassName("w3-sidenav") as unknown as HTMLCollectionOf<HTMLElement>;
    box[0].style.display="block"
  }

  newAppointment(){
    const followUpDetails: FollowUp = {
      isFollow: false,
      apppointment_id: -1
    }
    localStorage.setItem("followUp",JSON.stringify(followUpDetails));
    this.router.navigate(['patient-departments']);
  }

 showpreviousappointments(){
  this.previous_appointments=!this.previous_appointments;
 }

 getPatientDetails(){
  console.log(localStorage.getItem("patient_details"));
  this.patient_details = JSON.parse( localStorage.getItem("patient_details")!);
  console.log("Sfdgsfh");
  console.log(this.patient_details);
  
 }

 generatePrescription(appointmentId: number) : void{
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

  getPreviousAppointments(){
    this.router.navigate(['patient-prev-appointments']);
  }

}
