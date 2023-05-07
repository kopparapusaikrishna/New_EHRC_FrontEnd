import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.css']
})
export class UserSelectComponent implements OnInit {

  num_consult: number = -1;
  num_doc:number = -1

  constructor(private home_service: HomeService) {
    this.getHomeStats();
   }

  ngOnInit(): void {
  }

  getHomeStats(){
    this.home_service.getPatientsCount()
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

}
