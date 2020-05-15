import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { CompanyService } from "../_services/company.service";
import { Company } from "../_models/Company";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-checkin-dialog",
  templateUrl: "./checkin-dialog.component.html",
  styleUrls: ["./checkin-dialog.component.css"],
})
export class CheckinDialogComponent implements OnInit {
  studentName: string;
  form: FormGroup;
  companies: Company[] = [];
  filteredOptions: Observable<Company[]>;
  time = { hour: null, minute: null };

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CheckinDialogComponent>,
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) { name, company, time, companies }
  ) {
    this.studentName = name;
    this.companies = companies;
    this.companies.sort(this.sortByName);

    this.form = this.fb.group({
      company: [company, Validators.required],
      time: [time, Validators.required],
    });
  }

  ngOnInit() {
    this.filteredOptions = this.form.controls.company.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: any): Company[] {
    var filterValue = "";

    if (typeof value === "string") {
      filterValue = value.toLowerCase();
    }

    return this.companies.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  save() {
    // check time is valid
    if (
      this.time != null &&
      this.time.hour != null &&
      this.time.minute != null &&
      this.form.controls["company"].valid
    ) {
      this.form.controls["time"].setValue(
        this.time.hour + ":" + this.time.minute
      );

      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }

  getOptionText(option) {
    return option.name;
  }

  sortByName(item1: Company, item2: Company) {

    if (item1.name < item2.name) {
      return -1;
    }
    else if (item1.name > item2.name) {
      return 1;
    }
    else {
      return 0;
    }
  }
}
