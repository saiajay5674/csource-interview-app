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
  @Input() enable: boolean;

  message = "show interviwee list";
  constructor(private router: Router) {}

  ngOnInit() {
    //trim long company names
    if (this.company.name.length > 6) {
      this.company.name = this.company.name.substring(0, 4) + "...";
    }
  }
  list_interviewees() {
    if (this.enable) {
      this.router.navigate(["/company", {id: this.company.companyUser}]);
    }
  }
  @Output() activateEvent = new EventEmitter<Company>();
  @Output() deactivateEvent = new EventEmitter<Company>();
  onChange($event: MatSlideToggleChange) {
    if ($event.checked) {
      this.activateEvent.emit(this.company);
    } else if (!$event.checked) {
      this.deactivateEvent.emit(this.company);
    }
  }
}
