import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { Router } from '@angular/router';
import { Prescription } from 'src/app/models/prescription.model';
import { FollowUp } from 'src/app/models/follow-up.model';
import { PdfService } from 'src/app/services/pdf.service';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent  implements OnInit {

  prescription_list: Array<Prescription>;
  patient_details: any;
  doctor_id: any;
  patient_record_id: number = -1;
  prescription: Prescription = {};

  doctor_details:any;

  prev_appointment_id: number = -2;
  prev_appointment: FollowUp;

  showDiv:boolean = true;
  saved:boolean = false;
  medicineForm:FormGroup;
  patientForm: FormGroup;

  constructor(private router: Router, private doctorService: DoctorService, private pdfService: PdfService) { 
    this.doctor_details = JSON.parse(localStorage.getItem("doctor_details")!);

    this.prescription_list = new Array<Prescription>;
    this.patient_details ={};
    this.doctor_id = JSON.parse(localStorage.getItem("doctor_details")!).doctorId;
    console.log(this.doctor_id);
    this.getPatientDetails();
    console.log(this.patient_details);
    this.prev_appointment_id = +localStorage.getItem("prev_appointment_id")!;
    this.prev_appointment = {
      isFollow: this.prev_appointment_id === -1,
      apppointment_id: this.prev_appointment_id
    };

    this.medicineForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      power: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$')]),
      dosage: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')])
    });

    this.patientForm = new FormGroup({
      weight: new FormControl('', [ Validators.pattern('^[0-9]*\.?[0-9]+$')]),
      temperature: new FormControl('', [ Validators.pattern('^[0-9]*\.?[0-9]+$')]),
      bp: new FormControl('', [Validators.pattern('^[1-9][0-9]{1,2}/[1-9][0-9]{1,2}$')]),
      followup: new FormControl('', [ Validators.pattern('^(Yes|No)$')]),
      followUpDate: new FormControl('',[])
    });


  }

  ngOnInit(): void {
  }

  getPatientDetails(){
    this.doctorService.getPatientDetails(this.doctor_id)
    .subscribe({
      next: (data:any) => {
        this.patient_details = data;
      },
      error: (e) => {
        console.log(e);
      }
    });
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
    console.log(follow_up);
    console.log(follow_up === "Yes");
    return follow_up === "Yes";
  }

  getPrescription(){
    let appointmentId:number = this.prev_appointment.apppointment_id!;
    this.pdfService.generatePrescription(appointmentId).subscribe(response => {
      console.log(response);
      console.log(response.headers.get('content-disposition'));
      // let fileName = response.headers.get('content-disposition')!.split(';')[1].split('=')[1];
      let fileName = "prescription.pdf";
      let blob:Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    })
    }

  onSubmit(){

    if(this.patientForm.valid == false){
      alert("Please enter the patient details correctly");
    }
    else{
      console.log(this.prescription_list);
      console.log(this.patientForm.value);
      const data = {
        weight: this.patientForm.get('weight')?.value,
        doctor_id: this.doctor_id,
        bp: this.patientForm.get('bp')?.value,
        temperature: this.patientForm.get('temperature')?.value,
        prescription: this.convertPrescription(),
        follow_up: this.patientForm.get('followup')?.value,
        followup_date: this.patientForm.get('followUpDate')?.value
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
  }

  addMedicine(){

    if(this.medicineForm.valid == false){
      alert("Please enter all fields correctly");
    }

    else{
      const data: Prescription = {
        medicine_dosage: this.medicineForm.get('dosage')?.value,
        medicine_name: this.medicineForm.get('name')?.value,
        medicine_power: this.medicineForm.get('power')?.value,
        duration: this.medicineForm.get('duration')?.value
      };
      this.prescription = {}; 
      this.prescription_list.push(data);
      this.showDiv = false;
      console.log(this.prescription_list);
      setTimeout(() => {
        this.showDiv = true;
      }, 0);
    }
  }

  delete(i: number){
    this.prescription_list.splice(i,1);
  }
}
