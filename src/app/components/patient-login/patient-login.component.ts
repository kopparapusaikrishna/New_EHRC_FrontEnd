import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/services/loginservice.service';
// import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.css']
})
export class PatientLoginComponent implements OnInit {

  model={phone_number:"",otp:""};
  otp_sent=false;
  a:string | null | undefined
  constructor(private loginservice:LoginserviceService,private router : Router) {
  
  }
  ngOnInit(): void {
    
  }

  sendOTP() {
    // TODO: Send a request to a back-end service to generate and send OTP to the user's phone number.
    this.loginservice.PatientOTP(this.model.phone_number)
    .subscribe({
      next: (response:any) => {
        // Verify OTP entered by user
        if (response == 1) {
          // Authenticate user and log them in
          alert('OTP sent successfully.');
        } 
        else {
          alert('OTP sending failed!');
        }
      },
    });
    this.otp_sent=true;
  }

  verifyOTP() {
    // TODO: Send a request to a back-end service to verify the OTP.
    // If the OTP is valid, log the user in.
    this.loginservice.PatientVerifyOTP(this.model.phone_number,this.model.otp)
      .subscribe((response:  any) => {
        // Verify OTP entered by user
        //console.log(response);
        if (response.token == "not") {
          // Authenticate user and log them in
          alert('OTP incorrect!');
          this.router.navigate(["/Patient"]);
        } else {
          localStorage.setItem("patient_token",JSON.stringify({patient_details:this.model,token:response.token}));
          this.router.navigate(["/profiles"]);
        }
      });
  }
}

