import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvailabilityCheck } from '../models/availability-check.model';


const baseUrl = 'https://f0b7-119-161-98-68.ngrok-free.app';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  putDoctorStatus(aval:AvailabilityCheck): Observable<number> {
    const token = JSON.parse(localStorage.getItem('doctor_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
 
    return this.http.put<number>(`${baseUrl}/DoctorAvailability`, aval,{headers});
  }
  getdoctordetails(doctor_email_id : String){
    const token = JSON.parse(localStorage.getItem('doctor_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    return this.http.get(`${baseUrl}/doctordetails?email_id=${doctor_email_id}`,{headers});
  }

  getChannelName(doctor_id: number, dept_name: string): Observable<any> {
    return this.http.get(`${baseUrl}/doctorChannel?doctor_id=${doctor_id}&dept_name=${dept_name}`, {headers:{'ngrok-skip-browser-warning':'google-chrome'}});
  }

  addAppointment(data: any): Observable<string>{
    return this.http.post<string>(`${baseUrl}/addAppointmentDetails`, data, {headers:{'ngrok-skip-browser-warning':'google-chrome'}});
  }

  getPatientDetails(data:any): Observable<any>{
    return this.http.get(`${baseUrl}/patientDetails?doctor_id=${data}`, {headers:{'ngrok-skip-browser-warning':'google-chrome'}});
  }

  getPreviousAppointments(doctor_id: number): Observable<any>{
    return this.http.get(`${baseUrl}/doctorPreviousAppointmentsList?doctor_id=${doctor_id}`, {headers:{'ngrok-skip-browser-warning':'google-chrome'}});
  }

}