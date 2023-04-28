import { Component, OnInit } from '@angular/core';
import { Doctor_Prev_appointments } from 'src/app/models/doctor-prev-appointments';
import { DoctorService } from 'src/app/services/doctor.service';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-doctor-previous-appointments',
  templateUrl: './doctor-previous-appointments.component.html',
  styleUrls: ['./doctor-previous-appointments.component.css']
})
export class DoctorPreviousAppointmentsComponent implements OnInit {

  prevAppointmentsLst: Array<Doctor_Prev_appointments>;
  doctor_details:any;
  constructor(private doctorService: DoctorService, private pdfService: PdfService) { 
    this.prevAppointmentsLst = new Array<Doctor_Prev_appointments>;
    this.doctor_details = JSON.parse(localStorage.getItem("doctor_details")!);
    console.log(this.doctor_details);

    this.getPreviousAppointments();
    console.log(this.prevAppointmentsLst);
  }

  ngOnInit(): void {
  }

  getPreviousAppointments(){
    this.doctorService.getPreviousAppointments(this.doctor_details.doctorId)
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
