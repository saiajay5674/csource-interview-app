import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-careerfair',
  templateUrl: './careerfair.component.html',
  styleUrls: ['./careerfair.component.css']
})
export class CareerfairComponent implements OnInit {

  public displayedColumns = ['semester', 'companies', 'interviewees', 'interviews', 'details', 'update', 'delete'
];
  public data = [{semester: "Spring 2020", companies: 30, interviewees: 70, interviews: 100}, {semester: "Fall 2019", companies: 25, interviewees: 65, interviews: 95}];
  public dataSource = new MatTableDataSource(this.data);

  constructor() { }

  ngOnInit() {
  }

}
