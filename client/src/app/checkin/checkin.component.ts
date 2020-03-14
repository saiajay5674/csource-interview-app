import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import { CheckinDialogComponent } from '../checkin-dialog/checkin-dialog.component';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  constructor(public dialog: MatDialog) {

     }

  ngOnInit() {
  }

  

  openDialog(): void {
    const dialogRef = this.dialog.open(CheckinDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}