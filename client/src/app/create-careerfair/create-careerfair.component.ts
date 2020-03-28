import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Careerfair } from '../_models/Careerfair'


@Component({
  selector: 'app-create-careerfair',
  templateUrl: './create-careerfair.component.html',
  styleUrls: ['./create-careerfair.component.css']
})
export class CreateCareerfairComponent implements OnInit {

  form: FormGroup
  constructor(private fb: FormBuilder,
    private dialog: MatDialogRef<CreateCareerfairComponent>,
    @Inject(MAT_DIALOG_DATA) {term, year}
    )
    {
      this.form = this.fb.group({
        semester: [term, Validators.required],
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

}
