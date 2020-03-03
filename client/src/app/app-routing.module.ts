import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CareerfairComponent } from './careerfair/careerfair.component'
import { CompanyComponent } from './company/company.component'

const routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'careerfair',
    component: CareerfairComponent
  },
  {
    path: 'company',
    component: CompanyComponent
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
