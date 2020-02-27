import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CareerFairsComponent } from './career-fairs/career-fairs.component'
import { AppComponent } from './app.component';

const routes = [
  {
    path: 'careerfair',
    component: CareerFairsComponent
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
