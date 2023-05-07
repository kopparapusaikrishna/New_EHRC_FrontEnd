import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getPatientsCount(): Observable<Array<number>> {

    const headers = {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning':'google-chrome'
    };
    return this.http.get<Array<number>>(`${baseUrl}/userHomeStats`, {headers});
  }
}
