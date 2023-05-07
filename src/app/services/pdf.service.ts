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
    return this.http.get(`${baseUrl}/prescriptions/${appointmentId}`,{responseType: 'blob', observe: 'response',headers:{'ngrok-skip-browser-warning':'google-chrome'}});
  }


}