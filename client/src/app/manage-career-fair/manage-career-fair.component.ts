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
  label;

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
      (cFair) => {
        this.careerfair = cFair;
        this.label = cFair.term + "  " + cFair.year;
        console.log("\n\n ++++ ", cFair.companies, " +++\n");

        this.active_company_list = (cFair.companies as unknown) as Company[];
        this.loadInactiveCompanies();
      },
      (error) => {
        console.log("\n\ngetCareerfair angular error ", id, error, "--\n");
      }
    );
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

        this.getCareerfair(this.id);
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

        this.getCareerfair(this.id);
      },
      (error) => {
        console.log("\n error on activate ", error, "-\n");
      }
    );
  }
}
