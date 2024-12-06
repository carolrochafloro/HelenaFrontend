import { Routes } from '@angular/router';
import { AllMedsComponent } from '@pages/all-meds/all-meds.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { DoctorsComponent } from '@pages/doctors/doctors.component';
import { LoginComponent } from '@pages/login/login.component';
import { MedDetailsComponent } from '@pages/med-details/med-details.component';
import { NewDoctorComponent } from '@pages/new-doctor/new-doctor.component';
import { NewMedComponent } from '@pages/new-med/new-med.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'meds',
    component: AllMedsComponent,
  },
  {
    path: 'newmed',
    component: NewMedComponent,
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
  },
  {
    path: 'newdoctor',
    component: NewDoctorComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'details',
    component: MedDetailsComponent,
  },
];
