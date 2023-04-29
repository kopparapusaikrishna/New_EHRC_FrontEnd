import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';
import { FollowUp } from 'src/app/models/follow-up.model';

@Component({
  selector: 'app-patient-departments',
  templateUrl: './patient-departments.component.html',
  styleUrls: ['./patient-departments.component.css']
})
export class PatientDepartmentsComponent implements OnInit {

  departmentsLst: Array<string>;
  selectedIndex: number;
  patient_details:any;
  constructor(private patientService : PatientService, private router : Router) { 
    this.departmentsLst = new Array<string>;
    this.selectedIndex = -1;
    // this.departmentsLst = ["allergist", "cardiologist", "chiropractor", " dentist", "pediatrician", "ophthalmologist"];
    this.retrieveDepartments();
    this.patient_details = JSON.parse(localStorage.getItem("patient_details")!);
  }

  ngOnInit(): void {
  }

  retrieveDepartments(): void {
    this.patientService.getDepartmentsLst()
      .subscribe({
        next: (data:any) => {
          this.departmentsLst = data;
          console.log(this.departmentsLst);
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  retreiveHasDepartment(): void {
    if(this.selectedIndex == -1) {
      alert("Select the departemnt you want to consult.")
    }
    else {
      this.patientService.getContainsDepartment(this.departmentsLst[this.selectedIndex])
        .subscribe({
          next: (data:String) => {
            console.log(data);
            if(data==="Success"){
              const details:FollowUp = JSON.parse(localStorage.getItem("followUp")!)
              if(details.isFollow == false){
                this.getChannelName(this.departmentsLst[this.selectedIndex]);
                console.log(localStorage.getItem("channel_name"));
                this.router.navigate(['meeting']);
              }
              else{
                console.log(details);
                this.followChannel(details.apppointment_id!, this.departmentsLst[this.selectedIndex]);
                console.log(localStorage.getItem("channel_name"));
                this.router.navigate(['meeting']);
              }
            }
            else if(data==="Failure"){
              alert("Doctors are not available");
            }
          },
          error: (e) => console.error(e)
        });
    }
  }



  changeSelection(event:any, index:number) {
    this.selectedIndex = event.target.checked ? index : -1;
    console.log(this.selectedIndex);

    // do your logic here...
  }

  followChannel(appointment_id: number,department: string){
    console.log(department);
    console.log(appointment_id);
    console.log("after");
    this.patientService.followUpDifferentDoctor(appointment_id, department)
    .subscribe({
      next: (data:any) => {
        console.log(data);
        localStorage.setItem("channel_name",data);
      },
      error: (e) => {
        console.log(e.error.message);
      }
    });
  }

  getChannelName(department: string){
    this.patientService.getChannelName(this.patient_details.patientId,department)
    .subscribe({
      next: (data:string) => {
        console.log(data);
        localStorage.setItem("channel_name",data);
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
}
