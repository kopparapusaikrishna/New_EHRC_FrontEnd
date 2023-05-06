import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable } from 'rxjs';
// import { JwtHelperService } from '@auth0/angular-jwt';

import { Profile } from '../models/profile.model';
import { ProfileLst } from '../models/profile-lst.model';

const baseUrl = 'https://a744-119-161-98-68.ngrok-free.app';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

constructor(private http:HttpClient) { }
getDoctorData(username: string,password: string) {
    return this.http.get(`${baseUrl}/Doctor?username=${username}&password=${password}`, {headers:{'ngrok-skip-browser-warning':'google-chrome'}});
}

getAdminData(username: string,password: string) {
    return this.http.get(`${baseUrl}/Admin?username=${username}&password=${password}`, {headers:{'ngrok-skip-browser-warning':'google-chrome'}});
}

PatientOTP(phoneNumber:string) {
    console.log(phoneNumber);
    return this.http.get(`${baseUrl}/Patient/sendOTP?phone_number=${phoneNumber}`, {headers:{'ngrok-skip-browser-warning':'google-chrome'}});
}
PatientVerifyOTP(phoneNumber:string,otp:string) {
    return this.http.get(`${baseUrl}/Patient/verifyOTP?phone_number=${phoneNumber}&otp=${otp}`, {headers:{'ngrok-skip-browser-warning':'google-chrome'}});
}

postProfileDetails(profileDetails: Profile): Observable<string> {
  console.log("inside service" + profileDetails);
  return this.http.post(`${baseUrl}/PostProfileDetails`, profileDetails, {responseType: 'text', headers:{'ngrok-skip-browser-warning':'google-chrome'}});
}

getProfiles(phoneNumber:string): Observable<ProfileLst> {
  return this.http.get(`${baseUrl}/GetProfiles/`+phoneNumber, {headers:{'ngrok-skip-browser-warning':'google-chrome'}});
}

deleteProfile(patientId: number): Observable<string> {
  console.log("in delete profile service")
  return this.http.delete(`${baseUrl}/DeleteProfile/${patientId}`,{responseType: 'text', headers:{'ngrok-skip-browser-warning':'google-chrome'}})
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

