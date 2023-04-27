import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



const baseUrl = 'http://localhost:8101';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor(private http:HttpClient) { }

  generatePrescription(appointmentId: number) {
    return this.http.get(`${baseUrl}/prescriptions/${appointmentId}`,{responseType: 'blob', observe: 'response'});
  }


}