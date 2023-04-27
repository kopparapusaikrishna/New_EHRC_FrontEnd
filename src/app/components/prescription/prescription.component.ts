import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Prescription } from 'src/app/models/prescription.model';
@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent  implements OnInit {
  weight: number = -1;
  bp: string = '';
  temperature: number = -1;
  prescription_list: Array<Prescription>;
  patient_details: any;
  doctor_id: any;
  patient_record_id: number = -1;
  prescription: Prescription = {};
  follow_up:string = "Yes";
  followup_date: string = '';

  showDiv:boolean = true;
  saved:boolean = false;

  constructor(private router: Router, private doctorService: DoctorService) { 
    this.prescription_list = new Array<Prescription>;
    this.patient_details ={};
    // this.doctor_id = JSON.parse(localStorage.getItem("doctor_details")!).doctor_id;
  }

  ngOnInit(): void {
  }

  addPatientDetails(){
    this.saved = true;
  }

  convertPrescription():string{
    let fin:string = "";
    for(var j = 0; j < this.prescription_list.length ; j+=1)
    {
      fin = fin + this.prescription_list[j].medicine_name + '%' + 
      this.prescription_list[j].medicine_power + '%' + 
      this.prescription_list[j].medicine_dosage + '%' +
      this.prescription_list[j].duration + ';' 
    }
    return fin.substring(0, fin.length - 1);
	}

  followExist(follow_up: string): boolean{
    return follow_up === "Yes";
  }

  onSubmit(){
    console.log(this.prescription_list);

    const data = {
      weight: this.weight,
      doctor_id: this.doctor_id,
      bp: this.bp,
      temperature: this.temperature,
      prescription: this.convertPrescription(),
      follow_up: this.follow_up,
      followup_date: this.followup_date
    }
    console.log(data);

    this.doctorService.addAppointment(data)
    .subscribe({
      next: (data: string) => {
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      }
    });


  }

  addMedicine(){
    const data: Prescription = {
      medicine_dosage: this.prescription.medicine_dosage,
      medicine_name: this.prescription.medicine_name,
      medicine_power: this.prescription.medicine_power,
      duration: this.prescription.duration
    };
    this.prescription = {}; 
    this.prescription_list.push(data);
    this.showDiv = false;
    console.log(this.prescription_list);
    setTimeout(() => {
      this.showDiv = true;
    }, 0);
  }

  delete(i: number){
    this.prescription_list.splice(i,1);
  }
}
