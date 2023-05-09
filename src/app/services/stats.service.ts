import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class StatsService {

  constructor(private http: HttpClient) { }

  getDepartmentStats(start_date:string, end_date: string): Observable<Map<string,number>>{
    const token = JSON.parse(localStorage.getItem('admin_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    return this.http.get<Map<string,number>>(`${baseUrl}/departmentStatistics?start_date=${start_date}&end_date=${end_date}`,{headers});
  }

  getDoctorsDepartment(): Observable<Map<string,number>> {
    const token = JSON.parse(localStorage.getItem('admin_token')!).token;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };
    return this.http.get<Map<string,number>>(`${baseUrl}/doctorDepartmentStatistics`,{headers});
  }

}