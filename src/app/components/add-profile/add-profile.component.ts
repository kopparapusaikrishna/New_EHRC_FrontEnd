import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile.model';
import { LoginserviceService } from 'src/app/services/loginservice.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {

  name: string;
  ph_no: string;
  dob: Date;
  gender: string;
  location: string;
  status: string;
  pin: string;

  constructor(private loginserviceService: LoginserviceService) { 
    this.name = "";
    this.ph_no = JSON.parse(localStorage.getItem("patient_token")!).patient_details.phone_number;
    this.dob = new Date('0000-00-00');
    this.gender = "";
    this.location = "";
    this.status = "";
    this.pin = "";
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const profile: Profile = {
      patient_id: 0,
      name: this.name,
      dob: this.dob,
      gender: this.gender,
      phone_number: this.ph_no,
      location: this.location,
      pin: this.pin
    };

    console.log("inside controller"+profile);

    this.loginserviceService.postProfileDetails(profile).subscribe({
      next: (data:any) => {
        this.status = data;
        console.log(this.status);

        if(this.status == "Success") {
          alert("this.status");
          this.name="";
          this.ph_no="";
          this.dob=new Date('0000-00-00');
          this.gender="";
          this.location="";
        }
        else {
          alert("this.status"); 
        }
      },
      error:(e) => console.error(e)
    });
  
  }


  

}