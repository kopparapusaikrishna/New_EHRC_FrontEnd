import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departments_lst } from '../models/departments-lst.model';


const baseUrl = 'http://localhost:8101';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getDepartmentsLst(): Observable<Departments_lst> {
    return this.http.get<Departments_lst>(`${baseUrl}/PatientDepartment`);
  }
  
  getContainsDepartment(deptName: string): Observable<string> {
    return this.http.get(`${baseUrl}/patient?department_name=${deptName}`,{responseType: 'text'});
  }
  getUserProfileslst(phone_number: string){
    const token = JSON.parse(localStorage.getItem('patient_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    };
 
    console.log("scscscs");
    return this.http.get(`${baseUrl}/profiles/`+phone_number,{headers});
    // return "Hello";
  }
  getuserprofilepass(patient_id : number): Observable<any>{
    const token = JSON.parse(localStorage.getItem('patient_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    };
    return this.http.get(`${baseUrl}/profiles/pin?patient_id=${patient_id}`,{headers});

  }

  getChannelName(patient_id: number, dept_name: string): Observable<string>{
    console.log(patient_id);
    console.log(dept_name);
    return this.http.get(`${baseUrl}/patientChannelGlobal?patient_id=${patient_id}&dept_name=${dept_name}`, {responseType: 'text'});
  }

  getPreviousAppointments(patient_id: number): Observable<any>{
    return this.http.get(`${baseUrl}/previousAppointmentsList?patient_id=${patient_id}`);
  }

  followUpSameDoctor(appointment_id: number): Observable<any>{
    return this.http.get(`${baseUrl}/patientChannelLocal/Same?appointment_id=${appointment_id}`,{responseType: 'text'});
  }

  followUpDifferentDoctor(appointment_id:number, dept_name: string): Observable<any>{
    return this.http.get(`${baseUrl}/patientChannelLocal/Different?appointment_id=${appointment_id}&dept_name=${dept_name}`);
  }

}