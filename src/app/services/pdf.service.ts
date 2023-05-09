import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor(private http:HttpClient) { }

  generatePrescription(appointmentId: number) {

    let user = localStorage.getItem('doctor_token');
    if(user == null){
      user = localStorage.getItem('patient_token');
    }
    const token = JSON.parse(user!).token;

    if(token == null){
      const token = JSON.parse(localStorage.getItem('patient_token')!).token;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'ngrok-skip-browser-warning':'google-chrome'
    };

    return this.http.get(`${baseUrl}/prescriptions/${appointmentId}`,{responseType: 'blob', observe: 'response',headers});
  }


}