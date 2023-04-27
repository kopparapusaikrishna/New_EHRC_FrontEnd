import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/services/loginservice.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  model={username:"",password:""}
  getData:any

  constructor(private loginservice:LoginserviceService, private router : Router) { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  loginadmin() {
    //console.log("sff");
    let user=this.model.username;
    let password=this.model.password;
    if (user== "" || password == "")
        alert("Please fill all the fields");
    else{
      this.loginservice.getAdminData(user,password)
        .subscribe((response: any) => {
          console.log(response);
          console.log("fsfsf");
          if (response.token == "not") {
            // Authenticate user and log them in
            alert('username and password doesnt match!');
          } else {
            localStorage.setItem("admin_token",response.token);
            this.router.navigate(["/admin-dashboard"]);
          }
        })

    }
  } 
}

