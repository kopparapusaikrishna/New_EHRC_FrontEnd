import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/admin.service';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-view-admins',
  templateUrl: './view-admins.component.html',
  styleUrls: ['./view-admins.component.css']
})
export class ViewAdminsComponent implements OnInit {
  adminsLst: Array<Admin>;

  status: string;

  sidenav!: MatSidenav;

  constructor(private adminService : AdminService, private router: Router, private observer: BreakpointObserver) {
    const admin1: Admin = {
      admin_id: 0,
      name: "bhayya",
      dob: new Date('2023-09-24'),
      gender: 'M',
      email_id: 'bhayyabro@gmai.com',
      password: '123456',
      phone_number: '9848440825',
    };

    const admin2: Admin = {
      admin_id: 0,
      name: "bakka",
      dob: new Date('2023-09-24'),
      gender: 'F',
      email_id: 'bakka@gmai.com',
      password: '123456',
      phone_number: '9848440827',
    };

    this.adminsLst = new Array();

    this.status = "";

    this.retrieveAdmins();
  }

  ngOnInit(): void {
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




  retrieveAdmins(): void {
    this.adminService.getAdminsLst()
      .subscribe({
        next: (data:any) => {
          this.adminsLst = data;
          console.log(this.adminsLst);
          // console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  deleteAdmin(adminId: number): void {
    console.log("called");
    console.log(adminId);
    var result = confirm("Are you sure you want to delete?");

    if(result) {
      this.adminService.delAdmin(adminId)
      .subscribe({
        next: (data:any) => {
          this.status = data;
          console.log(this.status);
          // console.log(data);

          if(this.status === "Success") {
            console.log("Deleted");
          }
          else{
            console.log("Not Deleted");
          }
        },
        error: (e) => console.error(e)
      });

    }
  }

}
