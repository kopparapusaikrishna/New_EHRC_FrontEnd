import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginserviceService } from './services/loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: LoginserviceService, private router: Router) {}
  canActivate(){
   
    //const currentUser = localStorage.getItem("currentUser");
   const token=localStorage.getItem("patient_token");
   console.log(token);
    if (token) {
      return true;
    }
    alert("your session has expired");
    this.router.navigate(['/Patient']);
    return false;
  }
  
}
