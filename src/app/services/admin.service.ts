import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctors_lst } from '../models/doctors-lst.model';
import { Doctor } from '../models/doctor.models';
import { Admin } from '../models/admin.model';
import { Admins_lst } from '../models/admins-lst.model';


const baseUrl = 'https://140d-119-161-98-68.ngrok-free.app';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getDoctorsLst(): Observable<Doctors_lst> {
    return this.http.get<Doctors_lst>(`${baseUrl}/GetDoctorsList`,{headers:{'ngrok-skip-browser-warning':'google-chrome'}});
  }

  postDoctorDetails(doctorDetails: Doctor): Observable<string> {
    return this.http.post(`${baseUrl}/PostDoctorDetails`, doctorDetails, {responseType: 'text', headers:{'ngrok-skip-browser-warning':'google-chrome'}});
  }

  postAdminDetails(adminDetails: Admin): Observable<string> {
    return this.http.post(`${baseUrl}/PostAdminDetails`, adminDetails, {responseType: 'text', headers:{'ngrok-skip-browser-warning':'google-chrome'}});
  }

  getAdminsLst(): Observable<Admins_lst> {
    return this.http.get<Admins_lst>(`${baseUrl}/GetAdminsList`, {headers:{'ngrok-skip-browser-warning':'google-chrome'}});
  }

  delDoctor(doctorId: number): Observable<string> {
    return this.http.delete(`${baseUrl}/DeleteDoctor?doctorId=${doctorId}`,{responseType: 'text', headers:{'ngrok-skip-browser-warning':'google-chrome'}})
  }

  delAdmin(adminId: number): Observable<string> {
    return this.http.delete(`${baseUrl}/DeleteAdmin?adminId=${adminId}`,{responseType: 'text',headers:{'ngrok-skip-browser-warning':'google-chrome'}})
  }

  getNoOfConsultations(doctorId: number, noOfDays: number): Observable<number> {
    return this.http.get<number>(`${baseUrl}/NoOfConsultations?doctorId=${doctorId}&noOfDays=${noOfDays}`,{headers:{'ngrok-skip-browser-warning':'google-chrome'}})
  }

}