import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-checkin-dialog',
  templateUrl: './checkin-dialog.component.html',
  styleUrls: ['./checkin-dialog.component.css']
})
export class CheckinDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CheckinDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  save(){
    this.dialogRef.close("It was saved!");
  }

}
