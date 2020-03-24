import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

class Interviewees {
  name: string;
  time: string;
}

@Component({
  selector: 'app-checked-students',
  templateUrl: './checked-students.component.html',
  styleUrls: ['./checked-students.component.css']
})
export class CheckedStudentsComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['name', 'time', 'checked'];
  
  dataSource: MatTableDataSource<Interviewees>;
  @ViewChild(MatSort, {static: false}) sort: MatSort;


  constructor() { }

  ngOnInit() {
    const interviewees: Interviewees[] = [{name: "Jack", time: "8:00"},{name: "Peter", time: "8:30"},
    {name: "Jessica", time: "9:00"},{name: "Tony", time: "9:30"},{name: "Jason", time: "10:00"}];
    this.dataSource = new MatTableDataSource(interviewees);
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
