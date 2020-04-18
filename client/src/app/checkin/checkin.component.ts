import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from "@angular/material";
import { CheckinDialogComponent } from '../checkin-dialog/checkin-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../_services/student.service' 
import { CareerfairService } from '../_services/careerfair.service';
import { Careerfair } from '../_models/Careerfair';
import { first } from 'rxjs/operators';
import { NotificationService } from '../_services/notification.service';
import { LoaderService } from '../_services/loader.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  form: FormGroup;
  passport: string;
  student: string;
  currentFair: Careerfair

  constructor(public dialog: MatDialog, 
    private formBuilder: FormBuilder, 
    private studentService: StudentService, 
    private careerfairService: CareerfairService,
    private notifService: NotificationService,
    private loader: LoaderService) {
      this.careerfairService.getCurrent().subscribe((result) => {
        this.currentFair = result;
      });
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
      passport: [null, [Validators.required, Validators.pattern("[9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]")]]
    });
  }

  getStudent() {
    this.studentService.getStudent(this.passport).subscribe( result => {
      this.student = result.name;
      this.openDialog();
    }, (error) => {
      console.log(error);
    });
  }

  getDateObj(time) {

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    const now = new Date();

    const year = now.getFullYear();
    const day = now.getDate();
    const month = monthNames[now.getMonth()];

    return new Date(`${month} ${day} ${year} ${time}`);
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
      time: '',
      companies: this.currentFair.companies
    };

    const dialogRef = this.dialog.open(CheckinDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.careerfairService.addInterview(this.currentFair._id, result.company._id, this.passport, this.getDateObj(result.time)).pipe(first()).subscribe((result) => {
            this.notifService.showNotif('Checked-in', 'SUCCESS');
          });
          this.passport = '';
        }

        this.passport = '';
    });
  }

}