import { Component, OnInit,  ViewChild } from '@angular/core';
import { stringify } from 'querystring';
import { MatTableDataSource, MatSort, MatSlideToggleChange } from '@angular/material';
import { Careerfair } from '../_models/Careerfair'
import { CareerfairService } from '../_services/careerfair.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CreateCareerfairComponent } from '../create-careerfair/create-careerfair.component'
import { NotificationService } from '../_services/notification.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-careerfair',
  templateUrl: './careerfair.component.html',
  styleUrls: ['./careerfair.component.css']
})
export class CareerfairComponent implements OnInit {

  searchText: string;

  public displayedColumns = ['term', 'year', 'companies', 'students', 'interviews', 'details', 'statistics', 'active'];
  careerfairs: Careerfair[] = [];
  dataSource: MatTableDataSource<Careerfair> = new MatTableDataSource(this.careerfairs);

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor(private careerfairService: CareerfairService,
    private dialog: MatDialog,
    private notificationService: NotificationService, private router: Router) { }

  ngOnInit() {
    this.getCareerfairs()
  }

  getCareerfairs() {
    this.careerfairService.getCareerfairs().subscribe( (records) => {
      this.careerfairs = records;
      this.dataSource = new MatTableDataSource(this.careerfairs);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createCareerfair() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;

    dialogConfig.data = {
      term: '', year: ''
    };

    const dialogRef = this.dialog.open(CreateCareerfairComponent, dialogConfig);

    dialogRef.afterClosed().subscribe( (result) => {
      this.careerfairService.addCareerfair(result).subscribe( (record) => {
        this.getCareerfairs()
        //this.notificationService.showNotif('Created ' + record.careerfair.term + record.careerfair.year, 'create');
      })
    })
  }

  onChange(event: MatSlideToggleChange, element: Careerfair) {

    if (event.checked) {
      this.careerfairService.updateCurrent(element._id).pipe(first()).subscribe( (result) => {
        this.getCareerfairs();
      })
    }    
  }
}
