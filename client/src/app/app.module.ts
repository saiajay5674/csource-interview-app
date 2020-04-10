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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckinDialogComponent } from './checkin-dialog/checkin-dialog.component';
import { CheckedStudentsComponent } from './checked-students/checked-students.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatSnackBarModule } from '@angular/material';
import { LoginComponent }  from './login/login.component'
import { ManageCareerFairComponent } from './manage-career-fair/manage-career-fair.component';
import { ManageCompanyCardComponent } from './manage-company-card/manage-company-card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CreateCareerfairComponent } from './create-careerfair/create-careerfair.component';
<<<<<<< HEAD
import { StatisticsComponent } from './statistics/statistics.component';
=======
import {MatAutocompleteModule} from '@angular/material/autocomplete';




>>>>>>> 112ecf7fc6c5541d2966e26af8dccdc5916c46d7



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CareerfairComponent,
    ManageCompaniesComponent,
    CompanyComponent,
    CheckinComponent,
    CheckinDialogComponent,
    CheckedStudentsComponent,
    CreateCompanyComponent,
    LoginComponent,
    ManageCareerFairComponent,
    ManageCompanyCardComponent,
    CreateCareerfairComponent,
    StatisticsComponent
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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatAutocompleteModule
  ],
  entryComponents: [
    CheckinDialogComponent,
    CreateCompanyComponent,
    CreateCareerfairComponent
  ],
  exports: [
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
