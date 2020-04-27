import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSelectChange} from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Careerfair } from '../_models/Careerfair'


@Component({
  selector: 'app-create-careerfair',
  templateUrl: './create-careerfair.component.html',
  styleUrls: ['./create-careerfair.component.css']
})
export class CreateCareerfairComponent implements OnInit {

  form: FormGroup
  selectedChoice: string;

  constructor(private fb: FormBuilder,
    private dialog: MatDialogRef<CreateCareerfairComponent>,
    @Inject(MAT_DIALOG_DATA) {term, year}
    )
    {
      this.form = this.fb.group({
        term: [term, Validators.required],
        year: [year, Validators.required]
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

  selected(event: MatSelectChange) {
    this.selectedChoice = event.value;
  }

}
