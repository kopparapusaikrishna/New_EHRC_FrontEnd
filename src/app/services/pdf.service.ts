import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



const baseUrl = 'https://f0b7-119-161-98-68.ngrok-free.app';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor(private http:HttpClient) { }

  generatePrescription(appointmentId: number) {
    return this.http.get(`${baseUrl}/prescriptions/${appointmentId}`,{responseType: 'blob', observe: 'response',headers:{'ngrok-skip-browser-warning':'google-chrome'}});
  }


}