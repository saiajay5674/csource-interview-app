import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CareerfairComponent } from './careerfair/careerfair.component';
import { ManageCompaniesComponent } from './manage-companies/manage-companies.component';
import { CompanyComponent } from './company/company.component';
import { CheckinComponent } from './checkin/checkin.component';
import { MatTableModule } from '@angular/material'




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CareerfairComponent,
    ManageCompaniesComponent,
    CompanyComponent,
    CheckinComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
