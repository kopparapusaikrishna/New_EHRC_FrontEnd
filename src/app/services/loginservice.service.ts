import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable } from 'rxjs';
// import { JwtHelperService } from '@auth0/angular-jwt';

import { Profile } from '../models/profile.model';
import { ProfileLst } from '../models/profile-lst.model';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

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
    const token = JSON.parse(localStorage.getItem('patient_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    console.log("inside service" + profileDetails);
    return this.http.post(`${baseUrl}/PostProfileDetails`, profileDetails, {responseType: 'text', headers});
  }

  getProfiles(phoneNumber:string): Observable<ProfileLst> {
    const token = JSON.parse(localStorage.getItem('patient_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    console.log("in delete profile service");
    return this.http.get(`${baseUrl}/GetProfiles/`+phoneNumber, {headers});
  }

  deleteProfile(patientId: number): Observable<string> {
    const token = JSON.parse(localStorage.getItem('patient_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    console.log("in delete profile service");
    return this.http.delete(`${baseUrl}/DeleteProfile/${patientId}`,{responseType: 'text', headers})
  }


  patient_logout() {
    // console.log('service');
    localStorage.removeItem('patient_token');
    localStorage.removeItem('patient_details');
  }

  doctor_logout() {
    localStorage.removeItem('doctor_token');
    localStorage.removeItem('doctor_details');
  }

  admin_logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_details');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('currentUser');
    if (token)
        return true;
    return false;
  }

}

