import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { stringify } from 'querystring';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Careerfair } from '../_models/Careerfair'
import { CareerfairService } from '../_services/careerfair.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CreateCareerfairComponent } from '../create-careerfair/create-careerfair.component'
import { NotificationService } from '../_services/notification.service';

class Fairs {
  semester: string;
  year: number;
  companies: number;
  interviewees: number;
  interviews: number;
}

@Component({
  selector: 'app-careerfair',
  templateUrl: './careerfair.component.html',
  styleUrls: ['./careerfair.component.css']
})
export class CareerfairComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['semester', 'year', 'companies', 'interviewees', 'interviews', 'details'
];
  dataSource: MatTableDataSource<Fairs>;

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private careerfairService: CareerfairService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit() {
    const fairs: Fairs[] = [{semester: "Spring", year: 2020, companies: 30, interviewees: 70, interviews: 100},
    {semester: "Fall", year: 2019, companies: 25, interviewees: 65, interviews: 95},
    {semester: "Spring", year: 2019, companies: 28, interviewees: 60, interviews: 90},
    {semester: "Fall", year:2018, companies: 35, interviewees: 75, interviews: 110}];
    this.dataSource = new MatTableDataSource(fairs);
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

    // dialogRef.afterClosed().subscribe( (result) => {
    //   this.careerfairService.addCareerfair(result).subscribe( (record) => {
    //     this.notificationService.showNotif('Created ' + record.careerfair.term + record.careerfair.year, 'create');
    //   })
    // })
  }

}
