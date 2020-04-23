import { Component, OnInit } from '@angular/core';
import { Company } from '../_models/Company'
import { CompanyService } from '../_services/company.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CreateCompanyComponent } from '../create-company/create-company.component'
import { NotificationService } from '../_services/notification.service';


@Component({
  selector: 'app-manage-companies',
  templateUrl: './manage-companies.component.html',
  styleUrls: ['./manage-companies.component.css']
})
export class ManageCompaniesComponent implements OnInit {

  companies: Company[] = [];
  searchText;


  constructor(private companyService: CompanyService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService.getCompanies().subscribe((records) => {
      this.companies = records;
      this.companies.sort(this.sortByName);
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
      this.companyService.addCompany(result).subscribe( (record) => {
        this.notificationService.showNotif('Created ' + record.company.name, 'create');
        this.loadCompanies();
      })
    })
  }

  sortByName(item1: Company, item2: Company) {

    if (item1.name < item2.name) {
      return -1;
    }
    else if (item1.name > item2.name) {
      return 1;
    }
    else {
      return 0;
    }
  }

}
