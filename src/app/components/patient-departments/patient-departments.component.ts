import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-departments',
  templateUrl: './patient-departments.component.html',
  styleUrls: ['./patient-departments.component.css']
})
export class PatientDepartmentsComponent implements OnInit {

  departmentsLst: Array<string>;
  selectedIndex: number;
  patient_details:any;
  constructor(private patientService : PatientService) { 
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
              alert("Doctors are available");
            }
            else if(data==="Failure"){
              alert("Doctors are not available");
            }
            // console.log(this.in_count_map);
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

  getChannelName(){
    this.patientService.getChannelName(4,'sjb')
    .subscribe({
      next: (data:string) => {
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
