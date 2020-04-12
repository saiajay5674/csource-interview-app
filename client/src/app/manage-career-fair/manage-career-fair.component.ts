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
  active_company_list: Company[] = [];
  searchText;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private careerfairService: CareerfairService
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getCareerfair(this.id);
    this.loadInactiveCompanies();
  }

  loadInactiveCompanies() {
    this.companyService.getCompanies().subscribe((records) => {
      this.inactive_company_list = records;
    });
  }

  getCareerfair(id) {
    this.careerfairService.getCareerfair(id).subscribe((record) => {
      this.careerfair = record;
      console.log("\n\n ++++ ", record.companies[0], " +++\n");

      this.getCompanies(record.companies);
    });
  }

  //get all companies //TODO fetch all at once instad of one at a time????
  getCompanies(companies) {
    //console.log("\n\n ~~~~~~ getCompanies ", companies, " ~~~~~~\n\n");

    companies.forEach((element) => {
      //TODO fix null
      this.companyService.getCompany(element).subscribe(
        (record) => {
          var company = record as Company;

          this.inactive_company_list = this.inactive_company_list.filter(
            //TODO do better way???
            (obj) => {
              return obj.name !== company.name;
            }
          );

          this.active_company_list.push({
            _id: company._id.toString(),
            name: company.name,
            domain: company.domain,
            companyUser: company.companyUser,
          });

          console.log("\n\n && retrived company ", record, " &&\n");
        },
        (error) => {
          console.log("\n\n && retrive company error ", error, " &&\n");
        },
        () => {
          console.log("\n ended on activate \n");
        }
      );
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
      _id: this.id.toString(),
      companyId: $event._id.toString(),
      enable: true,
    };

    this.careerfairService.updateCompanyList(company).subscribe(
      (record) => {
        this.inactive_company_list = this.inactive_company_list.filter(
          (obj) => {
            return obj.name !== $event.name;
          }
        );

        console.log("\n record on activate ", record, "-\n");

        var company = record as Company;
        this.active_company_list.push({
          _id: company._id,
          name: company.name,
          domain: company.domain,
          companyUser: company.companyUser,
        });
      },
      (error) => {
        console.log("\n error on activate ", error, "-\n");
      },
      () => {
        console.log("\n ended on activate \n");
      }
    );

    // this.careerfairService;
    // this.active_company_list.push($event);
  }
}
