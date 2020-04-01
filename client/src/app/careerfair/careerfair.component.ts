import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { stringify } from 'querystring';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Careerfair } from '../_models/Careerfair'
import { CareerfairService } from '../_services/careerfair.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CreateCareerfairComponent } from '../create-careerfair/create-careerfair.component'
import { NotificationService } from '../_services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-careerfair',
  templateUrl: './careerfair.component.html',
  styleUrls: ['./careerfair.component.css']
})
export class CareerfairComponent implements OnInit, AfterViewInit {

  searchText: string;

  public displayedColumns = ['semester', 'year', 'companies', 'interviewees', 'interviews', 'details'];
  careerfairs: Careerfair[];
  dataSource: MatTableDataSource<Careerfair>;

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private careerfairService: CareerfairService,
    private dialog: MatDialog,
    private notificationService: NotificationService, private router: Router) { }

  ngOnInit() {
    this.getCareerfairs()
    this.dataSource = new MatTableDataSource(this.careerfairs);
  }

  getCareerfairs() {
    this.careerfairService.getCareerfairs().subscribe( (records) => {

      console.log(records);
      this.careerfairs = records;
      this.dataSource = new MatTableDataSource(this.careerfairs);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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

  navigateManageCareerFair() {
    this.router.navigate(['/manageCareerfair']);
  }

}
