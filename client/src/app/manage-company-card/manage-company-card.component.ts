import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Company } from "../_models/Company";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSlideToggleChange } from "@angular/material";

@Component({
  selector: "app-manage-company-card",
  templateUrl: "./manage-company-card.component.html",
  styleUrls: ["./manage-company-card.component.css"],
})
export class ManageCompanyCardComponent implements OnInit {
  @Input() company: Company;
  message = "show interviwee list";

  enable: boolean;
  constructor(private router: Router) {
    //console.log("\n{{{{{ company id", this.company._id, "----");
    // if (this.company._id == "true") {
    //   this.enable = true;
    // } else if (this.company._id == "false") {
    //   this.enable = false;
    // }
  }

  ngOnInit() {
    console.log("\n{{{{{ company id", this.company._id, "----");
    if (this.company._id == "true") {
      this.enable = true;
    } else if (this.company._id == "false") {
      this.enable = false;
    }
  }
  list_interviewees() {
    console.log("\n\n}}}} Button clicked\n\n");
    this.router.navigate(["/checked"]);
  }

  onChange($event: MatSlideToggleChange) {
    if ($event.checked) {
      this.activate();
      this.enable = true;
    } else if (!$event.checked) {
      this.deactivate();
      this.enable = false;
    }

    console.log($event);
  }

  @Output() activateEvent = new EventEmitter<Company>();
  activate() {
    console.log("\n\n ########ccard is activated--\n");
    this.activateEvent.emit({
      _id: "true",
      name: this.company.name,
      domain: this.company.domain,
      companyUser: this.company.companyUser,
    });
  }

  @Output() deactivateEvent = new EventEmitter<Company>();
  deactivate() {
    this.deactivateEvent.emit({
      _id: "false",
      name: this.company.name,
      domain: this.company.domain,
      companyUser: this.company.companyUser,
    });
  }
}
