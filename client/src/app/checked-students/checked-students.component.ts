import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';


@Component({
  selector: 'app-checked-students',
  templateUrl: './checked-students.component.html',
  styleUrls: ['./checked-students.component.css']
})
export class CheckedStudentsComponent implements OnInit {

  public displayedColumns = ['name', 'time', 'delete'];
  public data = [{name: "Jack", time: "8:00"},{name: "Peter", time: "8:30"},{name: "Jessica", time: "9:00"},{name: "Tony", time: "9:30"},{name: "Jason", time: "10:00"}];
  public dataSource = new MatTableDataSource(this.data);

  constructor() { }

  ngOnInit() {
  }

}
