import { Component, Input, OnInit, Output } from '@angular/core';
import { Company } from '../_models/Company'
import { CreateCompanyComponent } from '../create-company/create-company.component'
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CompanyService } from '../_services/company.service';
import { NotificationService } from '../_services/notification.service';
import { ManageCompaniesComponent } from '../manage-companies/manage-companies.component';


@Component({
  selector: 'company-component',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  @Input() company: Company;

  public displaySendEmailState: Boolean = false;

  constructor(private companyService: CompanyService,
    private notificationService: NotificationService,
    private manageCompanies: ManageCompaniesComponent
  ) { }

  ngOnInit() {

  }

  copyToClip() {

    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `Username: ${this.company.companyUser.username}\nPassword: ${this.company.companyUser.password}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  delete() {
    this.companyService.deleteCompany(this.company).subscribe((result) => {
      this.notificationService.showNotif(this.company.name + ' is deleted', 'DELETE');
      this.manageCompanies.loadCompanies();
    })
  }

  displaySendEmail(): void {
    this.displaySendEmailState = !this.displaySendEmailState;
  }

  handlerClose(): void {
    this.displaySendEmailState = false;
  }

  handlSendEmail(args): void {
    console.log(args);
    this.handlerClose();
  }
}
