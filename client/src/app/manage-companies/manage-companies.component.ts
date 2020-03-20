import { Component, OnInit } from '@angular/core';
import { Company } from '../_models/Company'
import { CompanyService } from '../_services/company.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CreateCompanyComponent } from '../create-company/create-company.component'


@Component({
  selector: 'app-manage-companies',
  templateUrl: './manage-companies.component.html',
  styleUrls: ['./manage-companies.component.css']
})
export class ManageCompaniesComponent implements OnInit {

  companies: Company[] = [];

  constructor(private companyService: CompanyService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadCompanies();
  }

  private loadCompanies() {
    this.companyService.getCompanies().subscribe((records) => {
      this.companies = records;
    });
  }

  createCompany() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;

    dialogConfig.data = {
      name: '', domain: ''
  };

    const dialogRef = this.dialog.open(CreateCompanyComponent, dialogConfig);

    dialogRef.afterClosed().subscribe( (result) => {
      this.companyService.addCompany(result).subscribe( (records) => {
        this.companies = this.companies;
      })
    })
  }

}
