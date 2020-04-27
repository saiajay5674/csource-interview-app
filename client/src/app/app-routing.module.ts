import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CareerfairComponent } from './careerfair/careerfair.component';
import { CompanyComponent } from './company/company.component';
import { CheckinComponent } from './checkin/checkin.component';
import { CheckedStudentsComponent } from './checked-students/checked-students.component';
import { ManageCompaniesComponent } from './manage-companies/manage-companies.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_services/auth-guard.service';

import {ManageCareerFairComponent} from './manage-career-fair/manage-career-fair.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LoaderComponent } from './loader/loader.component';

const routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin']}
  },
  {
    path: 'manageCareerfair',
    component: ManageCareerFairComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin']}
  },
  {
    path: 'manage-companies',
    component: ManageCompaniesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin']}
  },
  {
    path: 'checkin',
    component: CheckinComponent
  },
  {
    path: 'company',
    component: CheckedStudentsComponent,
    data: { roles: ['admin', 'company']}
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin']}
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
