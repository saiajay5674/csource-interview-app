import { Component, OnInit } from "@angular/core";
import { Company } from "../_models/Company";
import { CompanyService } from "../_services/company.service";

@Component({
  selector: "app-manage-career-fair",
  templateUrl: "./manage-career-fair.component.html",
  styleUrls: ["./manage-career-fair.component.css"]
})
export class ManageCareerFairComponent implements OnInit {
  company_list: Company[] = [];
  searchText;

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService.getCompanies().subscribe(records => {
      this.company_list = records;
    });
  }
}
