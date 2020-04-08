import { Component, OnInit } from "@angular/core";
import { Company } from "../_models/Company";
import { CompanyService } from "../_services/company.service";
import { User } from "../_models/User";

@Component({
  selector: "app-manage-career-fair",
  templateUrl: "./manage-career-fair.component.html",
  styleUrls: ["./manage-career-fair.component.css"],
})
export class ManageCareerFairComponent implements OnInit {
  // temp_user: User ={username}

  active_company_list: Company[] = [
    {
      _id: "false",
      name: "facebook",
      domain: "facebook.com",
      companyUser: new User(),
    },
  ];

  inactive_company_list: Company[] = [
    {
      _id: "true",
      name: "google",
      domain: "google.com",
      companyUser: new User(),
    },
    {
      _id: "true",
      name: "apple",
      domain: "apple.com",
      companyUser: new User(),
    },
    {
      _id: "true",
      name: "ibm",
      domain: "ibm.com",
      companyUser: new User(),
    },
    {
      _id: "true",
      name: "tesla",
      domain: "tesla.com",
      companyUser: new User(),
    },
    {
      _id: "true",
      name: "spacex",
      domain: "spacex.com",
      companyUser: new User(),
    },
    {
      _id: "true",
      name: "rivian",
      domain: "rivian.com",
      companyUser: new User(),
    },
  ];

  searchText;

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    console.log();
    //this.loadCompanies();
  }

  deactivate($event) {
    this.active_company_list = this.active_company_list.filter((obj) => {
      return obj.name !== $event.name;
    });

    this.inactive_company_list.push($event);
  }

  activate($event) {
    console.log("\n\n ########activate called--\n");
    this.inactive_company_list = this.inactive_company_list.filter((obj) => {
      return obj.name !== $event.name;
    });

    this.active_company_list.push($event);
  }
}
