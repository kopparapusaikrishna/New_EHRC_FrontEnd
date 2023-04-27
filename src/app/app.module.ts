import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { AddProfileComponent } from './components/add-profile/add-profile.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { PatientDepartmentsComponent } from './components/patient-departments/patient-departments.component';
import { PatientLoginComponent } from './components/patient-login/patient-login.component';
import { UserProfilesComponent } from './components/user-profiles/user-profiles.component';
import { UserSelectComponent } from './components/user-select/user-select.component';
import { ViewAdminsComponent } from './components/view-admins/view-admins.component';
import { ViewDoctorsComponent } from './components/view-doctors/view-doctors.component';
import { DoctorPreviousAppointmentsComponent } from './components/doctor-previous-appointments/doctor-previous-appointments.component';
import { PatientPreviousAppointmentsComponent } from './components/patient-previous-appointments/patient-previous-appointments.component';

@NgModule({
  declarations: [
    AppComponent,
    AddAdminComponent,
    AddDoctorComponent,
    AddProfileComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    DoctorDashboardComponent,
    DoctorLoginComponent,
    PatientDashboardComponent,
    PatientDepartmentsComponent,
    PatientLoginComponent,
    UserProfilesComponent,
    UserSelectComponent,
    ViewAdminsComponent,
    ViewDoctorsComponent,
    PatientDepartmentsComponent,
    DoctorPreviousAppointmentsComponent,
    PatientPreviousAppointmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
