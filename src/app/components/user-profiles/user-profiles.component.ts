import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';

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
  constructor(private router: Router,private patientservice:PatientService,private loginservice:LoginserviceService) {
   
   }

  ngOnInit(): void {
    
    this.phone_number = JSON.parse(localStorage.getItem('patient_token')!).patient_details.phone_number;
    this.getprofiles();
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
}
