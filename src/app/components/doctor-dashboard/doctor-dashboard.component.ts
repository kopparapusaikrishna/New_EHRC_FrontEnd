import { Component, OnInit } from '@angular/core';
import { AvailabilityCheck } from 'src/app/models/availability-check.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  available: boolean;
  showpreviousappointments=true;
  doctor_details:any;
  constructor(private doctorService: DoctorService,private patientservice:PatientService) { 
    this.available = true;
    this.toggleChange();
  }

  ngOnInit(): void {
    this.getDoctorDetails();
  }
  getDoctorDetails(){
    const username=JSON.parse(localStorage.getItem("doctor_token")!).doctor_email_id;
    this.doctorService.getdoctordetails(username)
    .subscribe({
      next:(res:any)=>{
        this.doctor_details=res;
      }
    });
  }
  toggleChange() {
    if(this.available==true){
      this.available=false;
    }
    else if(this.available==false){
      this.available=true;
    }
    //console.log(this.available);

    let aval = new AvailabilityCheck();
    aval.doctorId = 1;
    aval.status = this.available;
    
    //console.log(aval);

    this.doctorService.putDoctorStatus(aval)
    .subscribe({
      next: (data:number) => {
        console.log(data);
        console.log("fsfdfdfdfde");
        if(data===1){
          alert("Status changed successfully.");
        }
        // console.log(this.in_count_map);
      },
      error: (e) => console.error(e)
    });
  }

  w3_close() {
    var box = document.getElementsByClassName("w3-sidenav") as unknown as HTMLCollectionOf<HTMLElement>;
    box[0].style.display="None"
   
  }
  w3_open() {
    var box = document.getElementsByClassName("w3-sidenav") as unknown as HTMLCollectionOf<HTMLElement>;
    box[0].style.display="block"
  }
  showappointments(){
    this.showpreviousappointments=!this.showpreviousappointments;
  }
}
