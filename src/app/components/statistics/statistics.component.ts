import { Component, OnInit  } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { StatsService } from 'src/app/services/stats.service';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  
  c_bool:boolean = false;
  start_date:string = '';
  end_date:string = '';
  public num_consultants = 1;
  public num_doctors = 0;
  public c_pieChartlabel: Array<string>;
  public c_values: Array<number>;

  sidenav!: MatSidenav;
  admin_details:any;

  public c_pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public c_pieChartDatasets = [ {
    data: [ 0 ]
  } ];
  public c_pieChartLegend = true;
  public c_pieChartPlugins = [];
  
  d_bool:boolean = false;
  public d_pieChartlabel: Array<string>;
  public d_values: Array<number>;

  public d_pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public d_pieChartDatasets = [ {
    data: [ 0 ]
  } ];
  public d_pieChartLegend = true;
  public d_pieChartPlugins = [];
  
  ngOnInit() {
    
  }

  constructor(private statService: StatsService, private router: Router, private loginservice: LoginserviceService, private observer: BreakpointObserver){
    this.admin_details = JSON.parse(localStorage.getItem("admin_details")!);
    
    this.c_pieChartlabel = new Array<string>;
    this.c_values = new Array<number>;

    this.d_pieChartlabel = new Array<string>;
    this.d_values = new Array<number>;

    this.getDoctorsPerDepartment();

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


  onSubmit(){
    console.log(this.start_date);
    console.log(this.end_date);
    this.c_bool = true;
    this.statService.getDepartmentStats(this.start_date,this.end_date)
    .subscribe({
      next: (data: any) => {
        console.log(data);
        const keys = Object.keys(data);
        this.num_consultants = 0;
        this.c_pieChartlabel = new Array<string>;
        this.c_values = new Array<number>;
        for (const key of keys) {
          this.c_pieChartlabel.push(key);
          this.c_values.push(data[key]);
          const value = data[key];
          this.num_consultants = this.num_consultants + value;
        }

        this.c_pieChartDatasets = [ {
          data: this.c_values
        } ];

      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  getDoctorsPerDepartment(){
    this.d_bool = true;
    this.statService.getDoctorsDepartment()
    .subscribe({
      next: (data: any) => {
        const keys = Object.keys(data);
        this.num_doctors = 0;
        this.d_pieChartlabel = new Array<string>;
        this.d_values = new Array<number>;
        for (const key of keys) {
          this.d_pieChartlabel.push(key);
          this.d_values.push(data[key]);
          const value = data[key];
          this.num_doctors = this.num_doctors + value;
        }

        this.d_pieChartDatasets = [ {
          data: this.d_values
        } ];

      },
      error: (e) => {
        console.log(e);
      }
    });
  }


  logout() {
    // console.log('component');
    this.loginservice.admin_logout();
    this.router.navigate(['/Admin']);
  }

}