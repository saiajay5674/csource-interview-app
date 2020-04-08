import { Component, OnInit, Input } from "@angular/core";
import { Company } from "../_models/Company";
import { CompanyService } from "../_services/company.service";
import { User } from "../_models/User";
import { Careerfair } from '../_models/Careerfair';
import { ActivatedRoute } from '@angular/router';
import { CareerfairService } from '../_services/careerfair.service';

@Component({
  selector: "app-manage-career-fair",
  templateUrl: "./manage-career-fair.component.html",
  styleUrls: ["./manage-career-fair.component.css"],
})
export class ManageCareerFairComponent implements OnInit {
  // temp_user: User ={username}

  careerfair: Careerfair = new Careerfair();
  id: string;

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

  constructor(private companyService: CompanyService, private route: ActivatedRoute, private careerfairService: CareerfairService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getCareerfair(this.id);
    //this.loadCompanies();
  }

  getCareerfair(id) {
    this.careerfairService.getCareerfair(id).subscribe( (record) => {
      this.careerfair = record;
      console.log(this.careerfair);
    });
  }

  deactivate($event) {
    this.active_company_list = this.active_company_list.filter((obj) => {
      return obj.name !== $event.name;
    });

    this.inactive_company_list.push($event);
  }

  activate($event) {
    this.inactive_company_list = this.inactive_company_list.filter((obj) => {
      return obj.name !== $event.name;
    });

    this.active_company_list.push($event);
  }
}
