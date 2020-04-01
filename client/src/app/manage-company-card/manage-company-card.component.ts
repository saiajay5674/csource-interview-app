import { Component, Input, OnInit } from "@angular/core";
import { Company } from "../_models/Company";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-manage-company-card",
  templateUrl: "./manage-company-card.component.html",
  styleUrls: ["./manage-company-card.component.css"]
})
export class ManageCompanyCardComponent implements OnInit {
  @Input() company: Company;
  message = "show interviwee list";
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      enable: false,
      text: [
        {
          value: null,
          disabled: true
        }
      ]
    });
  }

  ngOnInit() {}
  list_interviewees() {
    console.log("\n\n}}}} Button clicked\n\n");
    this.router.navigate(["/checked"]);
  }

  onChange(enable: boolean) {
    if (enable) {
      //   console.log("\n\n !!!------");
      //  alert("enabled");
    } else {
      // alert("disabled");
    }
  }
}
