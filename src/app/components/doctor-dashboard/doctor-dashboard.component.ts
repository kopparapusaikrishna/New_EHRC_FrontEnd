import { Component, OnInit } from '@angular/core';
import { AvailabilityCheck } from 'src/app/models/availability-check.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoginserviceService } from 'src/app/services/loginservice.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  available: boolean;
  showpreviousappointments=true;
  doctor_details:any;
  channel_name:string = '';
  sidenav!: MatSidenav;
  endmyday:boolean=false;

  global_count:number = -1;
  local_count:number = -1;

  constructor(private router: Router,private doctorService: DoctorService,private patientservice:PatientService, private observer: BreakpointObserver, private loginservice: LoginserviceService) { 
    this.available = true;
    this.getDoctorDetails();
    this.doctor_details = JSON.parse(localStorage.getItem("doctor_details")!);
    this.getPatientStats();
  }

  ngOnInit(): void {
    this.toggleChange();
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




  getDoctorDetails(){
    const username=JSON.parse(localStorage.getItem("doctor_token")!).doctor_email_id;
    this.doctorService.getdoctordetails(username)
    .subscribe({
      next:(res:any)=>{
        this.doctor_details=res;
        localStorage.setItem("doctor_details",JSON.stringify(this.doctor_details));
        console.log(this.doctor_details);
      }
    });
  }
  
  doctorPreviousAppointments(){
    this.router.navigate(['doctor-prev-appointments']);
  }

  toggleChange() {
    if(this.available==true){
      this.available=false;
    }
    else if(this.available==false){
      this.available=true;
    }
    //console.log(this.available);

    let aval = new AvailabilityCheck();
    aval.doctorId = this.doctor_details.doctorId;
    aval.status = this.available;
    
    //console.log(aval);

    this.doctorService.putDoctorStatus(aval)
    .subscribe({
      next: (data:number) => {
        console.log(data);
        console.log("fsfdfdfdfde");
        if(data===1){
          alert("Status changed successfully.");
        }
        // console.log(this.in_count_map);
      },
      error: (e) => console.error(e)
    });
  }

  endMyDay(){
    var result = confirm("Are you sure you want to end your day?");
    this.toggleChange();
    if (result) {
      console.log(this.doctor_details.doctorId);
      this.doctorService.endMyDay(this.doctor_details.doctorId)
      .subscribe({
        next: (data:any) => {
          console.log(data);
          this.getPatientStats();
          this.endmyday = true;
          
        },
        error: (e) => console.error(e)
      });
    }
  }

  getChannelName(){
    this.channel_name = 'ssss';
    this.doctorService.getChannelName(this.doctor_details.doctorId,this.doctor_details.departmentName, this.available)
    .subscribe({
      next: (data:any) => {
        this.channel_name = data.channel_name;
        console.log(data);
        localStorage.setItem("channel_name",this.channel_name);
        localStorage.setItem("prev_appointment_id",data.appointment_id);
        console.log(this.channel_name);
        window.open('prescription','_blank');
        this.router.navigate(['meeting']);
        
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  getPatientStats(){
    this.doctorService.getPatientsCount(this.doctor_details.doctorId,this.doctor_details.departmentName)
    .subscribe({
      next: (data:Array<number>) => {
        this.global_count = data[0];
        this.local_count = data[1];
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  w3_close() {
    var box = document.getElementsByClassName("w3-sidenav") as unknown as HTMLCollectionOf<HTMLElement>;
    box[0].style.display="None"
   
  }
  w3_open() {
    var box = document.getElementsByClassName("w3-sidenav") as unknown as HTMLCollectionOf<HTMLElement>;
    box[0].style.display="block"
  }
  showappointments(){
    this.showpreviousappointments=!this.showpreviousappointments;
  }

  logout() {
    // console.log('component');
    this.loginservice.doctor_logout();
    this.router.navigate(['/Doctor']);
  }
}
