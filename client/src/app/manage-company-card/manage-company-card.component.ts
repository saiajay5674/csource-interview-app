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
    //console.log("\n{{{{{ company id", this.company._id, "----");
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
  @Output() activateEvent = new EventEmitter<Company>();
  @Output() deactivateEvent = new EventEmitter<Company>();
  onChange($event: MatSlideToggleChange) {
    if ($event.checked) {
      this.activateEvent.emit(this.company);
      console.log("\n\n *** switch on \n");

      this.enable = true;
    } else if (!$event.checked) {
      this.deactivateEvent.emit(this.company);
      this.enable = false;
    }
  }
}
