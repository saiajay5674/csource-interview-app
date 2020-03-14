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
import { MatTableModule, MatSortModule } from '@angular/material';
import { MatDialogModule, MatSelectModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CheckinDialogComponent } from './checkin-dialog/checkin-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CareerfairComponent,
    ManageCompaniesComponent,
    CompanyComponent,
    CheckinComponent,
    CheckinDialogComponent
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
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  entryComponents: [
    CheckinDialogComponent
  ],
  exports: [
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
