import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.models';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-view-doctors',
  templateUrl: './view-doctors.component.html',
  styleUrls: ['./view-doctors.component.css']
})
export class ViewDoctorsComponent implements OnInit {

  consults: Map<number, [number, number, boolean]>; //days, no_of_consultings, display 

  doctorsLst: Array<Doctor>;
  status: string;

  no_of_days: number;
  check: boolean;
  no_of_consults: number;

  doctor_id: number;

  constructor(private adminService : AdminService) { 
    const doct1: Doctor = {
      doctor_id: 0,
      name: "Mohan Babu",
      dob: new Date('2023-09-24'),
      gender: 'M',
      doctor_start_date: new Date('2012-09-24'),
      email_id: 'MohanBabu@gmai.com',
      password: '123456',
      qualification: 'MBBS',
      department_name: 'Dermatologist',
      phone_number: '9848440825',
      clinic_address: 'Tadon Health Clinic, k block, Gandhi nagar, Tirupathi'
    };
    const doct2: Doctor = {
      doctor_id: 1,
      name: "Ram Babu",
      dob: new Date('2023-09-4'),
      gender: 'M',
      doctor_start_date: new Date('2001-01-24'),
      email_id: 'RamBabu@gmai.com',
      password: '12345678',
      qualification: 'Degree',
      department_name: 'Gen-Physician',
      phone_number: '9123456799',
      clinic_address: 'Tadon Health Clinic, h block, Auto nagar, Hyderabad'
    };

    this.doctorsLst = new Array();

    this.status = "";
    this.consults = new Map<number, [number, number, boolean]>();

    this.no_of_days = 0;
    this.check = false;
    this.no_of_consults = 0;

    this.doctor_id = -1;

    this.retrieveDoctors();
  }

  ngOnInit(): void {
    
  }

  checkIf(doctorId: number): boolean {
    if(doctorId == this.doctor_id) {
      return true;
    }
    else{
      return false;
    }
  }

  getYearsSince(target_date: Date): number {
    const now = new Date();
    const years = now.getFullYear() - target_date.getFullYear();
    const months = now.getMonth() - target_date.getMonth();
    if (months < 0 || (months === 0 && now.getDate() < target_date.getDate())) {
      return years - 1;
    }
    return years;
  }

  retrieveDoctors(): void {
    this.adminService.getDoctorsLst()
      .subscribe({
        next: (data:any) => {
          this.doctorsLst = data;
          console.log(this.doctorsLst);
          // console.log(data);
        },
        error: (e) => console.error(e)
      });

    for(let i=0; i<this.doctorsLst.length; i++) {
      this.consults.set(this.doctorsLst[i].doctor_id, [0, 0, false]);
    }
  }

  deleteDoctor(doctorId: number): void {
    console.log("Called");
    var result = confirm("Are you sure you want to delete?");

    if(result) {
      this.adminService.delDoctor(doctorId)
      .subscribe({
        next: (data:any) => {
          this.status = data;
          console.log(this.status);
          // console.log(data);

          if(this.status === "Success") {
            console.log("Deleted");
          }
          else{
            console.log("Not Deleted");
          }
        },
        error: (e) => console.error(e)
      });

    }
  }


  retriveNoOfConsultations(doctorId: number): void {
    console.log(doctorId);
    this.doctor_id = doctorId;
    this.adminService.getNoOfConsultations(doctorId, this.no_of_days)
    .subscribe({
      next: (data:any) => {
        console.log(this.no_of_days);
        console.log(data);
        this.no_of_consults = data;
      },
      error: (e) => console.error(e)
    });
    this.no_of_consults = 10; 
  }

}
