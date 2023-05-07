import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departments_lst } from '../models/departments-lst.model';
import { environment } from 'src/environments/environment';


const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getDepartmentsLst(): Observable<Departments_lst> {
    const token = JSON.parse(localStorage.getItem('patient_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    return this.http.get<Departments_lst>(`${baseUrl}/PatientDepartment`, {headers});
  }
  
  getContainsDepartment(deptName: string): Observable<string> {
    const token = JSON.parse(localStorage.getItem('patient_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    return this.http.get(`${baseUrl}/patient?department_name=${deptName}`,{responseType: 'text', headers});
  }
  getUserProfileslst(phone_number: string){
    const token = JSON.parse(localStorage.getItem('patient_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
 
    console.log("scscscs");
    return this.http.get(`${baseUrl}/profiles/`+phone_number,{headers});
    // return "Hello";
  }
  getuserprofilepass(patient_id : number): Observable<any>{
    const token = JSON.parse(localStorage.getItem('patient_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    return this.http.get(`${baseUrl}/profiles/pin?patient_id=${patient_id}`,{headers});

  }

  getChannelName(patient_id: number, dept_name: string): Observable<string>{
    console.log(patient_id);
    console.log(dept_name);
    const token = JSON.parse(localStorage.getItem('patient_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    return this.http.get(`${baseUrl}/patientChannelGlobal?patient_id=${patient_id}&dept_name=${dept_name}`, {responseType: 'text',headers})
  }

  getPreviousAppointments(patient_id: number): Observable<any>{
    const token = JSON.parse(localStorage.getItem('patient_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    return this.http.get(`${baseUrl}/previousAppointmentsList?patient_id=${patient_id}`,{headers});
  }

  followUpSameDoctor(appointment_id: number): Observable<any>{
    const token = JSON.parse(localStorage.getItem('patient_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    return this.http.get(`${baseUrl}/patientChannelLocal/Same?appointment_id=${appointment_id}`,{responseType: 'text',headers});
  }

  followUpDifferentDoctor(appointment_id:number, dept_name: string): Observable<any>{
    const token = JSON.parse(localStorage.getItem('patient_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    return this.http.get(`${baseUrl}/patientChannelLocal/Different?appointment_id=${appointment_id}&dept_name=${dept_name}`,{headers});
  }

}