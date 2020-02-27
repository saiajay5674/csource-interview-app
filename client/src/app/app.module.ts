import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CareerFairsComponent } from './career-fairs/career-fairs.component';

@NgModule({
  declarations: [
    AppComponent,
    CareerFairsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
