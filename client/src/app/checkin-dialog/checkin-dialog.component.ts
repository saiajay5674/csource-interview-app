import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CompanyService } from '../_services/company.service';
import { Company } from '../_models/Company';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-checkin-dialog',
  templateUrl: './checkin-dialog.component.html',
  styleUrls: ['./checkin-dialog.component.css']
})
export class CheckinDialogComponent implements OnInit {

  company = new FormControl();
  studentName:string;
  form: FormGroup
  companies: Company[] = [];
  filteredOptions: Observable<Company[]>;

  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<CheckinDialogComponent>, private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) {name, company, time} ) {
      this.studentName = name;
      
      this.form = this.fb.group({
        company: [company, Validators.required],
        time: [time, Validators.required]
      });

  }

  ngOnInit() {

    this.getCompanies();
    this.filteredOptions = this.company.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    
  }

  private _filter(value: string): Company[] {
    const filterValue = value.toLowerCase();

    return this.companies.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  
  getCompanies() {
    this.companyService.getCompanies().subscribe( records => {
      this.companies = records;
    })
  }

  save(){
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
