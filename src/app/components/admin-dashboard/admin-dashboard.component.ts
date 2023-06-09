import { Component } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AdminService } from 'src/app/services/admin.service';
import { LoginserviceService } from 'src/app/services/loginservice.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
    sidenav!: MatSidenav;

    admin_details: any;

    num_consult: number = -1;
    num_doc:number = -1

    constructor(private router: Router, private observer: BreakpointObserver, private admin_service: AdminService, private loginservice: LoginserviceService) {
      this.getadminHomeStats();
    }
    w3_close() {
        var box = document.getElementsByClassName("w3-sidenav") as unknown as HTMLCollectionOf<HTMLElement>;
        box[0].style.display="None"
    
    }
    w3_open() {
        var box = document.getElementsByClassName("w3-sidenav") as unknown as HTMLCollectionOf<HTMLElement>;
        box[0].style.display="block"
    }

    ngOnInit(): void {
        this.getAdminDetails();
    }

    ngAfterViewInit() {
        this.observer
          .observe(['(max-width: 800px)'])
          .pipe(delay(1), untilDestroyed(this))
          .subscribe((res) => {
            if (res.matches) {
              this.sidenav.mode = 'over';
              this.sidenav.close();
            } else {
              this.sidenav.mode = 'side';
              this.sidenav.open();
            }
          });
    
        this.router.events
          .pipe(
            untilDestroyed(this),
            filter((e) => e instanceof NavigationEnd)
          )
          .subscribe(() => {
            if (this.sidenav.mode === 'over') {
              this.sidenav.close();
            }
          });
  }

  getadminHomeStats(){
    this.admin_service.getPatientsCount()
    .subscribe({
      next: (data:Array<number>) => {
        this.num_consult = data[0];
        this.num_doc = data[1];
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  getAdminDetails(){
    const username=JSON.parse(localStorage.getItem("admin_token")!).admin_email_id;
    this.admin_service.getAdminDetails(username)
    .subscribe({
      next:(res:any)=>{
        this.admin_details=res;
        localStorage.setItem("admin_details",JSON.stringify(this.admin_details));
        console.log(this.admin_details);
      }
    });
  }

  logout() {
    // console.log('component');
    this.loginservice.admin_logout();
    this.router.navigate(['/Admin']);
  }

}
