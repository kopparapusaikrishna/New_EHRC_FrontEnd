import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile.model';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {
  ph_no: string;
  status: string;

  patientForm: FormGroup;

  constructor(private loginserviceService: LoginserviceService) { 
    this.ph_no = JSON.parse(localStorage.getItem("patient_token")!).patient_details.phone_number;
    this.status = "";

    this.patientForm = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.pattern(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      pin: new FormControl('',[Validators.required, Validators.pattern('^[1-9][0-9]{5}$')])
    });

  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const profile: Profile = {
      patient_id: 0,
      name: this.patientForm.get('name')?.value,
      dob: this.patientForm.get('dob')?.value,
      gender: this.patientForm.get('gender')?.value,
      phone_number: this.ph_no,
      location: this.patientForm.get('location')?.value,
      pin: this.patientForm.get('pin')?.value
    };

    if(this.patientForm.valid == false){
      alert("Please enter the patient details correctly");
    }

    else{
      console.log(this.patientForm.value);
      console.log("inside controller"+profile);

      this.loginserviceService.postProfileDetails(profile).subscribe({
        next: (data:any) => {
          this.status = data;
          console.log(this.status);

          if(this.status == "Success") {
            alert("this.status");
            this.ph_no="";
            this.patientForm.reset();
            
          }
          else {
            alert("this.status"); 
          }
        },
        error:(e) => console.error(e)
      });
    }
  }

}