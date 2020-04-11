import { Component, OnInit, Input } from "@angular/core";
import { Company } from "../_models/Company";
import { CompanyService } from "../_services/company.service";
import { User } from "../_models/User";
import { Careerfair } from "../_models/Careerfair";
import { ActivatedRoute } from "@angular/router";
import { CareerfairService } from "../_services/careerfair.service";

@Component({
  selector: "app-manage-career-fair",
  templateUrl: "./manage-career-fair.component.html",
  styleUrls: ["./manage-career-fair.component.css"],
})
export class ManageCareerFairComponent implements OnInit {
  careerfair: Careerfair = new Careerfair();
  id: string;

  inactive_company_list: Company[] = [];
  active_company_list: Company[];
  searchText;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private careerfairService: CareerfairService
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.loadInactiveCompanies();
    this.getCareerfair(this.id);
    //this.loadCompanies();
  }

  // active_company_list: Company[] = [
  //   {
  //     _id: "false",
  //     name: "facebook",
  //     domain: "facebook.com",
  //     companyUser: new User(),
  //   },
  // ];

  loadInactiveCompanies() {
    this.companyService.getCompanies().subscribe((records) => {
      this.inactive_company_list = records;
    });
  }

  getCareerfair(id) {
    this.careerfairService.getCareerfair(id).subscribe((record) => {
      this.careerfair = record;
      //this.active_company_list = record.companies
      console.log("\n\n ++++ ", record.companies, " +++\n");
    });
  }

  deactivate($event) {
    console.log("\n ++ deactivate angular ", $event, " \n++");
    // this.active_company_list = this.active_company_list.filter((obj) => {
    //   return obj.name !== $event.name;
    // });

    // this.inactive_company_list.push($event);
  }

  activate($event) {
    console.log("\n ++ activate angular ", $event, " \n++");

    let company = {
      _id: this.id,
      companyId: $event._id,
      enable: true,
    };

    this.careerfairService.updateCompanyList(company).subscribe(
      (record) => {
        console.log("\n record on activate ", record, "-\n");
      },
      (error) => {
        console.log("\n error on activate ", error, "-\n");
      },
      () => {
        console.log("\n ended on activate \n");
      }
    );

    // this.inactive_company_list = this.inactive_company_list.filter((obj) => {
    //   return obj.name !== $event.name;
    // });

    // this.careerfairService;
    // this.active_company_list.push($event);
  }
}
