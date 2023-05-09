import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { PatientService } from 'src/app/services/patient.service';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-user-profiles',
  templateUrl: './user-profiles.component.html',
  styleUrls: ['./user-profiles.component.css']
})
export class UserProfilesComponent implements OnInit {
  phone_number :string | undefined
  profile_lst : any;
  showpin : boolean = true;
  patient_d :any;
  pin : any;

  sidenav!: MatSidenav;
  type="password";
  icon="fa fa-fw fa-eye"

  constructor(private router: Router,private patientservice:PatientService,private loginservice:LoginserviceService, private observer: BreakpointObserver) {
   
   }

  ngOnInit(): void {
    
    this.phone_number = JSON.parse(localStorage.getItem('patient_token')!).patient_details.phone_number;
    this.getprofiles();
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


 getprofiles(){
  console.log(this.phone_number);
  this.patientservice.getUserProfileslst(this.phone_number!)
  .subscribe({
    next: (response:any) => {
      // Verify OTP entered by user
      this.profile_lst=response;
      console.log(response);
    },
  });
   
  console.log("aaaaaaaa");
 }

 goTopatientDashboard(patient_details: any){
  this.patient_d=patient_details;
  this.closepopup();
  //localStorage.setItem("patient_details", JSON.stringify( patient_details));
  //this.router.navigate(['patient-dashboard']);
 }
 closepopup(){
  
  this.showpin=!this.showpin;
  console.log(this.patient_d);
 }
 getuserpin(){
  console.log(this.patient_d.patientId);
   this.patientservice.getuserprofilepass(this.patient_d.patientId)
   .subscribe({
    next : (res : any) => {
      console.log(res);
      console.log(res.patientPin);
      console.log(this.pin);

      if (res.patientPin===this.pin){
         alert("pin is correct");
         localStorage.setItem("patient_details", JSON.stringify(this.patient_d));
         this.router.navigate(['patient-dashboard']);
      }
      else{
        alert("pin is incorrect")
      }
    }
   })
 }

 deleteProfile(patientId: number): void {
  console.log("called");
  console.log(patientId);
  var result = confirm("Are you sure you want to delete?");
  if (result) {
    console.log(patientId);
    this.loginservice.deleteProfile(patientId)
    .subscribe({
      next: (data:any) => {
        console.log(data);
        this.getprofiles();
      },
      error: (e) => console.error(e)
    });
  }

}

showpass(){
  if (this.type=="password"){
     this.type="text";
     this.icon="fa fa-fw fa-eye-slash"
  }
  else{
   this.type="password";
   this.icon="fa fa-fw fa-eye"
   }
 }


  logout() {
    // console.log('component');
    this.loginservice.patient_logout();
    this.router.navigate(['/Patient']);
  }

}
