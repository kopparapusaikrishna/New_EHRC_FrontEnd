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
    return this.http.get<Map<string,number>>(`${baseUrl}/departmentStatistics?start_date=${start_date}&end_date=${end_date}`);
  }

  getDoctorsDepartment(): Observable<Map<string,number>> {
    return this.http.get<Map<string,number>>(`${baseUrl}/doctorDepartmentStatistics`);
  }

}