import { Routes } from '@angular/router';
import { AllMedsComponent } from '@pages/all-meds/all-meds.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { DoctorsComponent } from '@pages/doctors/doctors.component';
import { NewMedComponent } from '@pages/new-med/new-med.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
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
];
