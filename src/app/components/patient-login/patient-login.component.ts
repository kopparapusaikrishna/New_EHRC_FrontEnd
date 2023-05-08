import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.css']
})
export class PatientLoginComponent implements OnInit {

  model={phone_number:"",otp:""};
  otp_sent=false;
  a:string | null | undefined;
  myForm:FormGroup;
  otpForm: FormGroup;
  constructor(private loginservice:LoginserviceService,private router : Router) {
    this.myForm = new FormGroup({
      mobile: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    });

    this.otpForm = new FormGroup({
      otp: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]),
    });

  }
  ngOnInit(): void {
    
  }

  sendOTP() {

    if (this.myForm.valid == false){
      alert("Enter the mobile number correctly");
    }

    else{
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

    // TODO: Send a request to a back-end service to generate and send OTP to the user's phone number.
    
  }

  verifyOTP() {
    // TODO: Send a request to a back-end service to verify the OTP.
    // If the OTP is valid, log the user in.

    if (this.otpForm.valid == false){
      alert("Enter the OTP number correctly");
    }

    else{
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
}

