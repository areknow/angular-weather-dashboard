import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard', pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  },
  {
    path: 'locations',
    loadChildren: './locations/locations.module#LocationsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'auth/login',
    loadChildren: './auth/auth.module#AuthModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
