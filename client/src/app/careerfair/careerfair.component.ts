import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { stringify } from 'querystring';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-careerfair',
  templateUrl: './careerfair.component.html',
  styleUrls: ['./careerfair.component.css']
})
export class CareerfairComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['semester', 'year', 'companies', 'interviewees', 'interviews', 'details', 'update', 'delete'
];
  public data = [{semester: "Spring", year: 2020, companies: 30, interviewees: 70, interviews: 100},
  {semester: "Fall", year: 2019, companies: 25, interviewees: 65, interviews: 95},
  {semester: "Spring", year: 2019, companies: 28, interviewees: 60, interviews: 90},
  {semester: "Fall", year:2018, companies: 35, interviewees: 75, interviews: 110}];
  public dataSource = new MatTableDataSource(this.data);

  @ViewChildren(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

}
