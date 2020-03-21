import {Component, Input, OnInit, Output} from '@angular/core';
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

  constructor(private companyService: CompanyService,
    private notificationService: NotificationService,
    private manageCompanies: ManageCompaniesComponent
    ) { }

  ngOnInit() {
  }

  delete() {
    this.companyService.deleteCompany(this.company).subscribe((result) => {
      this.notificationService.showNotif(this.company.name + ' is deleted', 'DELETE');
      this.manageCompanies.loadCompanies();
    })
  }

}
