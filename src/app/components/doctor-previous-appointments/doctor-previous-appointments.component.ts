import { Component, OnInit } from '@angular/core';
import { Doctor_Prev_appointments } from 'src/app/models/doctor-prev-appointments';
import { DoctorService } from 'src/app/services/doctor.service';
import { PdfService } from 'src/app/services/pdf.service';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-doctor-previous-appointments',
  templateUrl: './doctor-previous-appointments.component.html',
  styleUrls: ['./doctor-previous-appointments.component.css']
})
export class DoctorPreviousAppointmentsComponent implements OnInit {

  prevAppointmentsLst: Array<Doctor_Prev_appointments>;
  doctor_details:any;
  sidenav!: MatSidenav;

  constructor(private router: Router,private doctorService: DoctorService, private pdfService: PdfService, private observer: BreakpointObserver) { 
    this.prevAppointmentsLst = new Array<Doctor_Prev_appointments>;
    this.doctor_details = JSON.parse(localStorage.getItem("doctor_details")!);
    console.log(this.doctor_details);

    this.getPreviousAppointments();
    console.log(this.prevAppointmentsLst);
  }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
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
