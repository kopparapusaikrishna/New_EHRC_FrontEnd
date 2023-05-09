import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Doctor } from 'src/app/models/doctor.models';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  status: string;

  sidenav!: MatSidenav;
  admin_details:any;
  type="password";
  icon="fa fa-fw fa-eye";
  doctorForm:FormGroup;

  constructor(private router: Router, private adminService : AdminService, private observer: BreakpointObserver) { 

    this.status = "";
    this.admin_details = JSON.parse(localStorage.getItem("admin_details")!);

    this.doctorForm = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.pattern(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      ph_no: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      email_id: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
      password: new FormControl('',[Validators.required]),
      dept_name: new FormControl('',[Validators.required, Validators.pattern('^[A-Z][a-z]*$')]),
      clinic_address: new FormControl('', [Validators.required]),
      qualification: new FormControl('', Validators.required),
      doctor_start_date: new FormControl('', Validators.required)
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

    const doct: Doctor = {
      doctor_id: 0,
      name: this.doctorForm.get('name')?.value,
      dob: this.doctorForm.get('dob')?.value,
      gender: this.doctorForm.get('gender')?.value,
      doctor_start_date: this.doctorForm.get('doctor_start_date')?.value,
      email_id: this.doctorForm.get('email_id')?.value,
      password: this.doctorForm.get('password')?.value,
      qualification: this.doctorForm.get('qualification')?.value,
      department_name: this.doctorForm.get('dept_name')?.value,
      phone_number: this.doctorForm.get('ph_no')?.value,
      clinic_address: this.doctorForm.get('clinic_address')?.value
    };

    console.log(doct);

    if(this.doctorForm.valid == false){
      alert("Please enter all the fields correctly");
    }

    else{
      this.adminService.postDoctorDetails(doct)
      .subscribe({
        next: (data:any) => {
          this.status = data;
          console.log(this.status);
          // console.log(data);
          if(this.status === "Success") {
            alert(this.status);
            this.doctorForm.reset();
          }
          else {
            alert(this.status);
          }
        },
        error: (e) => console.error(e)
      });
    }

  }


}
