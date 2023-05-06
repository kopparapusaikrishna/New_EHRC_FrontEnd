import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctors_lst } from '../models/doctors-lst.model';
import { Doctor } from '../models/doctor.models';
import { Admin } from '../models/admin.model';
import { Admins_lst } from '../models/admins-lst.model';


const baseUrl = 'https://a744-119-161-98-68.ngrok-free.app';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getDoctorsLst(): Observable<Doctors_lst> {
    const token = JSON.parse(localStorage.getItem('admin_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    return this.http.get<Doctors_lst>(`${baseUrl}/GetDoctorsList`,{headers});
  }

  postDoctorDetails(doctorDetails: Doctor): Observable<string> {
    const token = JSON.parse(localStorage.getItem('admin_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    return this.http.post(`${baseUrl}/PostDoctorDetails`, doctorDetails, {responseType: 'text', headers});
  }

  postAdminDetails(adminDetails: Admin): Observable<string> {
    const token = JSON.parse(localStorage.getItem('admin_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    return this.http.post(`${baseUrl}/PostAdminDetails`, adminDetails, {responseType: 'text', headers});
  }

  getAdminsLst(): Observable<Admins_lst> {
    const token = JSON.parse(localStorage.getItem('admin_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    return this.http.get<Admins_lst>(`${baseUrl}/GetAdminsList`, {headers});
  }

  delDoctor(doctorId: number): Observable<string> {
    const token = JSON.parse(localStorage.getItem('admin_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    return this.http.delete(`${baseUrl}/DeleteDoctor?doctorId=${doctorId}`,{responseType: 'text', headers})
  }

  delAdmin(adminId: number): Observable<string> {
    const token = JSON.parse(localStorage.getItem('admin_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    return this.http.delete(`${baseUrl}/DeleteAdmin?adminId=${adminId}`,{responseType: 'text',headers})
  }

  getNoOfConsultations(doctorId: number, noOfDays: number): Observable<number> {
    const token = JSON.parse(localStorage.getItem('admin_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    return this.http.get<number>(`${baseUrl}/NoOfConsultations?doctorId=${doctorId}&noOfDays=${noOfDays}`,{headers})
  }

}