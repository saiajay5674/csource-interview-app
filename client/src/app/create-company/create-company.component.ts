import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from '../_models/Company'


@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  form: FormGroup
  constructor(private fb: FormBuilder,
    private dialog: MatDialogRef<CreateCompanyComponent>)
    {
      this.form = this.fb.group({
        name: ["", Validators.required],
        domain: [""]
      });

     }

  ngOnInit() {

  }

  close() {
    this.dialog.close();
  }

  save() {

    this.dialog.close(this.form.value);

  }

}
