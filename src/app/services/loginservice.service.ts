import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable } from 'rxjs';
// import { JwtHelperService } from '@auth0/angular-jwt';

import { Profile } from '../models/profile.model';
import { ProfileLst } from '../models/profile-lst.model';

const baseUrl = 'http://localhost:8101';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

constructor(private http:HttpClient) { }
getDoctorData(username: string,password: string) {
    return this.http.get(`${baseUrl}/Doctor/`+username+'/'+password);
}

getAdminData(username: string,password: string) {
    return this.http.get(`${baseUrl}/Admin/`+username+'/'+password);
}

PatientOTP(phoneNumber:string) {
    console.log(phoneNumber);
    return this.http.get(`${baseUrl}/Patient/sendOTP?phone_number=${phoneNumber}`);
}
PatientVerifyOTP(phoneNumber:string,otp:string) {
    return this.http.get(`${baseUrl}/Patient/verifyOTP?phone_number=${phoneNumber}&otp=${otp}`);
}

postProfileDetails(profileDetails: Profile): Observable<string> {
  console.log("inside service" + profileDetails);
  return this.http.post(`${baseUrl}/PostProfileDetails`, profileDetails, {responseType: 'text'});
}

getProfiles(phoneNumber:string): Observable<ProfileLst> {
  return this.http.get(`${baseUrl}/GetProfiles/`+phoneNumber);
}

deleteProfile(patientId: number): Observable<string> {
  console.log("in delete profile service")
  return this.http.delete(`${baseUrl}/DeleteProfile/${patientId}`,{responseType: 'text'})
}

login(email: string, password: string) {
   return this.http.get(`${baseUrl}/Doctor1/`+email+'/'+password)
    .subscribe((user: any) => {
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', user.token);
            return true;
          }
          return false;;
        })
      
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('currentUser');
    if (token)
       return true;
    return false;
  }

}

