import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { LoginserviceService } from 'src/app/services/loginservice.service';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent implements OnInit {
    model={username:"",password:""}
    getData:any
    type="password";
    icon="fa fa-fw fa-eye"
    constructor(private loginservice:LoginserviceService,private doctorservice:DoctorService,private router : Router) { }

    ngOnInit(): void {
      // TODO document why this method 'ngOnInit' is empty
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
    logindoctor(){
      //console.log("sff");
      let user=this.model.username;
      let password=this.model.password;
      console.log(user);
      if (user== "" || password == "")
        alert("Please fill all the fields");
      else{
        this.loginservice.getDoctorData(user,password)
        .subscribe((response: any) => {
          console.log(response);
          console.log("fsfsf");
          if (response.token == "not") {
            // Authenticate user and log them in
            alert('username and password doesnt match!');
          } else {
            localStorage.setItem("doctor_token",JSON.stringify({ doctor_email_id:user,token:response.token}));
            this.router.navigate(["/doctor-dashboard"]);
          }
        })

      }
    }
}

