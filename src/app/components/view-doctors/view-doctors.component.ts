import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.models';
import { AdminService } from 'src/app/services/admin.service';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-view-doctors',
  templateUrl: './view-doctors.component.html',
  styleUrls: ['./view-doctors.component.css']
})
export class ViewDoctorsComponent implements OnInit {

  consults: Map<number, [number, number, boolean]>; //days, no_of_consultings, display 
  admin_details:any;
  doctorsLst: Array<Doctor>;
  status: string;

  no_of_days: number;
  check: boolean;
  no_of_consults: number;

  doctor_id: number;

  sidenav!: MatSidenav;

  constructor(private adminService : AdminService, private router: Router, private observer: BreakpointObserver) { 
    
    this.admin_details = JSON.parse(localStorage.getItem("admin_details")!);

    this.doctorsLst = new Array();

    this.status = "";
    this.consults = new Map<number, [number, number, boolean]>();

    this.no_of_days = 0;
    this.check = false;
    this.no_of_consults = 0;

    this.doctor_id = -1;

    this.retrieveDoctors();
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

  checkIf(doctorId: number): boolean {
    if(doctorId == this.doctor_id) {
      return true;
    }
    else{
      return false;
    }
  }

  getYearsSince(target_date: Date): number {
    const now = new Date();
    var start = new Date(target_date);
    const years = now.getFullYear() - start.getFullYear();
    const months = now.getMonth() - start.getMonth();
    if (months < 0 || (months === 0 && now.getDate() < start.getDate())) {
      return years - 1;
    }
    return years;
  }

  retrieveDoctors(): void {
    this.adminService.getDoctorsLst()
      .subscribe({
        next: (data:any) => {
          this.doctorsLst = data;
          console.log(this.doctorsLst);
          // console.log(data);
        },
        error: (e) => console.error(e)
      });

    for(let i=0; i<this.doctorsLst.length; i++) {
      this.consults.set(this.doctorsLst[i].doctor_id, [0, 0, false]);
    }
  }

  deleteDoctor(doctorId: number): void {
    console.log("Called");
    var result = confirm("Are you sure you want to delete?");

    if(result) {
      this.adminService.delDoctor(doctorId)
      .subscribe({
        next: (data:any) => {
          this.status = data;
          console.log(this.status);
          // console.log(data);

          if(this.status === "Success") {
            console.log("Deleted");
          }
          else{
            console.log("Not Deleted");
          }
        },
        error: (e) => console.error(e)
      });

    }
  }


  retriveNoOfConsultations(doctorId: number): void {
    console.log(doctorId);
    this.doctor_id = doctorId;
    this.adminService.getNoOfConsultations(doctorId, this.no_of_days)
    .subscribe({
      next: (data:any) => {
        console.log(this.no_of_days);
        console.log(data);
        this.no_of_consults = data;
      },
      error: (e) => console.error(e)
    });
    this.no_of_consults = 10; 
  }

}
