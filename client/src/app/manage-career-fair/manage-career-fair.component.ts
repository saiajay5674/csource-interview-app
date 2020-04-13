import { Component, OnInit, Input } from "@angular/core";
import { Company } from "../_models/Company";
import { CompanyService } from "../_services/company.service";
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
  label

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
  }

  /**
   * get career fair by id
   * @param id - career fair id
   */
  getCareerfair(id) {
    this.careerfairService.getCareerfair(id).subscribe(
      (record) => {
        this.careerfair = record;
        this.label = record.term + "  " + record.year
        console.log("\n\n ++++ ", record, " +++\n");

        this.getCompanyById(record.companies);
      },
      (error) => {
        console.log("\n\ngetCareerfair angular error ", error, "--\n");
      }
    );
  }

  /**
   * get all companies //TODO fetch all at once instad of one at a time????
   * @param companies - array of company id
   */
  getCompanyById(companies) {
    companies.forEach((element) => {
      this.companyService.getCompany(element).subscribe(
        (record) => {
          var company = record as Company;

          this.active_company_list.push({
            _id: company._id,
            name: company.name,
            domain: company.domain,
            companyUser: company.companyUser,
          });
        },
        (error) => {
          console.log("\n\n && retrive company error ", error, " &&\n");
        }
      );
    });

    //load inactive company after all company list is filled (for filterning)
    this.loadInactiveCompanies();
  }

  /**
   * Fetch all companies from backend
   */
  loadInactiveCompanies() {
    this.companyService.getCompanies().subscribe(
      (allComapnies) => {
        this.inactive_company_list = allComapnies.filter((comp) => {
          return (
            this.active_company_list.map((e) => e.name).indexOf(comp.name) == -1
          );
        });
      },
      (error) => {
        console.log("LoadInactiveCompanies Error angular ", error);
      }
    );
  }

  /**
   * deactivate company card
   * @param $event - Company card properties
   */
  deactivate($event) {
    let company = {
      _id: this.id.toString(),
      companyId: $event._id.toString(),
      enable: false,
    };

    this.careerfairService.updateCompanyList(company).subscribe(
      (response) => {
        console.log("\n response on deactive ", response, "-\n");

        var company = response as Company;

        //remove from active list
        this.active_company_list.splice(
          this.active_company_list.indexOf(company)
        );

        this.inactive_company_list.push({
          _id: company._id,
          name: company.name,
          domain: company.domain,
          companyUser: company.companyUser,
        });
      },
      (error) => {
        console.log("\n error on activate ", error, "-\n");
      }
    );
  }

  /**
   * Activate company card
   * @param $event - company card properties
   */
  activate($event) {
    let company = {
      _id: this.id.toString(),
      companyId: $event._id.toString(),
      enable: true,
    };

    this.careerfairService.updateCompanyList(company).subscribe(
      (record) => {
        console.log("\n record on activate ", record, "-\n");

        var company = record as Company;

        //remove from inactive list
        this.inactive_company_list.splice(
          this.inactive_company_list.indexOf(company)
        );

        this.active_company_list.push({
          _id: company._id,
          name: company.name,
          domain: company.domain,
          companyUser: company.companyUser,
        });
      },
      (error) => {
        console.log("\n error on activate ", error, "-\n");
      }
    );
  }
}
