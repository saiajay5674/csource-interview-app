import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CareerfairComponent } from "./careerfair/careerfair.component";
import { ManageCompaniesComponent } from "./manage-companies/manage-companies.component";
import { CompanyComponent } from "./company/company.component";
import { CheckinComponent } from "./checkin/checkin.component";
import { MatTableModule, MatSortModule } from "@angular/material";
import { MatDialogModule, MatSelectModule } from "@angular/material";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CheckinDialogComponent } from "./checkin-dialog/checkin-dialog.component";
import { CheckedStudentsComponent } from "./checked-students/checked-students.component";
import { HttpClientModule } from "@angular/common/http";
import { CreateCompanyComponent } from "./create-company/create-company.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { MatSnackBarModule } from "@angular/material";
import { LoginComponent } from "./login/login.component";
import { ManageCareerFairComponent } from "./manage-career-fair/manage-career-fair.component";
import { ManageCompanyCardComponent } from "./manage-company-card/manage-company-card.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { CreateCareerfairComponent } from "./create-careerfair/create-careerfair.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatGridListModule } from "@angular/material/grid-list";
import { LoaderComponent } from "./loader/loader.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoaderInterceptor } from "./interceptors/loader.interceptor";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { SendEmailComponent } from "./send-email/send-email.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";

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
    StatisticsComponent,
    LoaderComponent,
    SendEmailComponent,
    ConfirmDialogComponent,
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
    MatAutocompleteModule,
    MatGridListModule,
    NgbModule,
  ],
  entryComponents: [
    CheckinDialogComponent,
    CreateCompanyComponent,
    CreateCareerfairComponent,
    ConfirmDialogComponent,
  ],
  exports: [MatSortModule, MatFormFieldModule, MatInputModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
