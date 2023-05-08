import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/admin.service';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  name: string;
  ph_no: string;
  dob: Date;
  gender: string;
  email_id: string;
  password: string;

  status:string;

  sidenav!: MatSidenav;
  admin_details:any;
  type="password";
  icon="fa fa-fw fa-eye"

  constructor(private adminService : AdminService, private router: Router, private observer: BreakpointObserver) {
    this.name = "";
    this.ph_no = "";
    this.dob = new Date('0000-00-00');
    this.gender = "";
    this.email_id = "";
    this.password = "";

    this.status = "";
    this.admin_details = JSON.parse(localStorage.getItem("admin_details")!);
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
    console.log("Form submitted!");
    console.log("Name: " + this.name);
    console.log("Phone: " + this.ph_no);
    console.log("DOB: " + this.dob);
    console.log("Gender: " + this.gender);
    console.log("Email: " + this.email_id);
    console.log("Password: " + this.password);

    const admin: Admin = {
      admin_id: 0,
      name: this.name,
      dob: this.dob,
      gender: this.gender,
      email_id: this.email_id,
      password: this.password,
      phone_number: this.ph_no,
    };

    this.adminService.postAdminDetails(admin)
    .subscribe({
      next: (data:any) => {
        this.status = data;
        console.log("status ", this.status);
        // console.log(data);

        if(this.status === "Success") {
          alert(this.status);
          this.name = "";
          this.ph_no = "";
          this.dob = new Date('0000-00-00');
          this.gender = "";
          this.email_id = "";
          this.password = "";

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
