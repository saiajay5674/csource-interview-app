import { Component, Input, OnInit } from "@angular/core";
import { Company } from "../_models/Company";
import { Router } from '@angular/router';

@Component({
  selector: "app-manage-company-card",
  templateUrl: "./manage-company-card.component.html",
  styleUrls: ["./manage-company-card.component.css"]
})
export class ManageCompanyCardComponent implements OnInit {
  @Input() company: Company;
  message = "show intervi"

  constructor(private router: Router) {}

  ngOnInit() {}
  list_interviewees() {
    console.log("\n\n}}}} Button clicked\n\n")
    this.router.navigate(['/checked']);
  }
}
