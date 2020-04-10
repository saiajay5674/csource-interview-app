import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from "@angular/material";
import { CheckinDialogComponent } from '../checkin-dialog/checkin-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../_services/student.service' 

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  form: FormGroup;
  passport: string;
  student: string;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private studentService: StudentService) {

     }

  ngOnInit() {

    this.form = this.formBuilder.group({
      passport: [null, [Validators.required, Validators.pattern("[9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]")]]
    })
  }

  getStudent() {
    this.studentService.getStudent(this.passport).subscribe( result => {
      this.student = result.name;
      this.openDialog();
    })
  }

  
  openDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '30%'
    dialogConfig.height = '50%'

    dialogConfig.data = {
      name: this.student,
      company: '',
      time: ''
    };

    const dialogRef = this.dialog.open(CheckinDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
        console.log(result);
    });
  }

}