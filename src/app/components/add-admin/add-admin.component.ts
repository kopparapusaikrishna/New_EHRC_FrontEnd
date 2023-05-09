import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/admin.service';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginserviceService } from 'src/app/services/loginservice.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  status:string;

  adminForm:FormGroup;

  sidenav!: MatSidenav;
  admin_details:any;
  type="password";
  icon="fa fa-fw fa-eye"

  constructor(private adminService : AdminService, private router: Router, private observer: BreakpointObserver, private loginservice: LoginserviceService) {

    this.status = "";
    this.admin_details = JSON.parse(localStorage.getItem("admin_details")!);

    this.adminForm = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.pattern(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      ph_no: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      email_id: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
      password: new FormControl('',[Validators.required])
    });

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

  onSubmit(): void {

    const admin: Admin = {
      admin_id: 0,
      name: this.adminForm.get('name')?.value,
      dob: this.adminForm.get('dob')?.value,
      gender: this.adminForm.get('gender')?.value,
      email_id: this.adminForm.get('email_id')?.value,
      password: this.adminForm.get('password')?.value,
      phone_number: this.adminForm.get('ph_no')?.value,
    };
    console.log(admin);
    if(this.adminForm.valid == false){
      alert("Enter all fields Correctly");
    }

    else{
      this.adminService.postAdminDetails(admin)
      .subscribe({
        next: (data:any) => {
          this.status = data;
          console.log("status ", this.status);
          // console.log(data);

          if(this.status === "Success") {
            alert(this.status);
            this.adminForm.reset();

          }
          else {
            alert(this.status);
          }
        },
        error: (e) => {
          console.error(e);
          alert("Please fill all the fields correctly");
        }
      });
    }

  }

  logout() {
    // console.log('component');
    this.loginservice.admin_logout();
    this.router.navigate(['/Admin']);
  }

}
