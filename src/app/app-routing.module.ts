import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { PatientDepartmentsComponent } from './components/patient-departments/patient-departments.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ViewDoctorsComponent } from './components/view-doctors/view-doctors.component';
import { ViewAdminsComponent } from './components/view-admins/view-admins.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { UserProfilesComponent } from './components/user-profiles/user-profiles.component';
import { AddProfileComponent } from './components/add-profile/add-profile.component';
import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { PatientLoginComponent } from './components/patient-login/patient-login.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { UserSelectComponent } from './components/user-select/user-select.component';
import { AuthGuard } from './auth.guard';
import { DoctorauthguardGuard } from './authguards/doctorauthguard.guard';
import { AdminauthguardGuard } from './authguards/adminauthguard.guard';
import { DoctorPreviousAppointmentsComponent } from './components/doctor-previous-appointments/doctor-previous-appointments.component';
import { PatientPreviousAppointmentsComponent } from './components/patient-previous-appointments/patient-previous-appointments.component';
import { MeetingComponent } from './components/meeting/meeting.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent,canActivate:[DoctorauthguardGuard]},
  { path: 'patient-departments', component: PatientDepartmentsComponent,canActivate:[AuthGuard]},
  { path: 'patient-dashboard', component: PatientDashboardComponent,canActivate: [AuthGuard]  },
  { path: 'admin-dashboard', component: AdminDashboardComponent,canActivate:[AdminauthguardGuard]},
  { path: 'view-doctors', component: ViewDoctorsComponent,canActivate:[AdminauthguardGuard]},
  { path: 'view-admins', component: ViewAdminsComponent,canActivate:[AdminauthguardGuard]},
  { path: 'add-admin', component: AddAdminComponent/*,canActivate:[AdminauthguardGuard]*/},
  { path: 'add-doctor', component: AddDoctorComponent,canActivate:[AdminauthguardGuard]},
  { path: 'profiles', component: UserProfilesComponent,canActivate:[AuthGuard]},
  { path: 'add-profile', component: AddProfileComponent},
  { path:'Doctor', component:DoctorLoginComponent},
  { path:'Patient', component:PatientLoginComponent},
  { path:'Admin', component:AdminLoginComponent},
  { path: 'home', component: UserSelectComponent},
  { path: 'patient-prev-appointments', component: PatientPreviousAppointmentsComponent},
  { path: 'doctor-prev-appointments', component: DoctorPreviousAppointmentsComponent},
  { path: 'meeting', component: MeetingComponent},
  { path: 'prescription', component: PrescriptionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
