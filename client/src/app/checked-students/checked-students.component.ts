import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Careerfair } from '../_models/Careerfair';
import { CareerfairService } from '../_services/careerfair.service';
import { Interview } from '../_models/Interview';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../_models/Student';
import { StudentService } from '../_services/student.service';

class Interviewees{
  name: string;
  time: Date;
  status: string;
}

@Component({
  selector: 'app-checked-students',
  templateUrl: './checked-students.component.html',
  styleUrls: ['./checked-students.component.css']
})
export class CheckedStudentsComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['name', 'time', 'status', 'checked'];

  dataSource: MatTableDataSource<Interviewees>;
  selectDataSource: MatTableDataSource<Interviewees>;

  @ViewChild(MatSort, { static: false }) sortBySelect: MatSort;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public selectDataItems: Interviewees[] = [];

  interviews: Interview[];
  students: Student[];
  careerfair: Careerfair;
  interviewees: Interviewees[];
  id;

  dataSourceFieldSortMap: any = {};
  dataSourceSelectFieldSortMap: any = {};

  constructor(
    private careerfairService: CareerfairService,
    private studentService: StudentService,
    private route: ActivatedRoute
    ) { this.id = this.route.snapshot.paramMap.get("id"); }

  ngOnInit() {

    this.careerfairService.getCurrentInterviews().subscribe( (records) => {
      this.careerfair = records;
    })
    this.getInterviews(this.careerfair);

    for (var i = 0; i < this.interviews.length; i++) {
      if (this.interviews[i].complete) {
        this.interviewees[i] = {name: this.interviews[i].student, time: this.interviews[i].time, status: "interviewed"};
      }
      else {
        this.interviewees[i] = {name: this.interviews[i].student, time: this.interviews[i].time, status: "checked in"};
      }
    }


    // const interviewees: Interviewees[] =
    //   [{ name: "Jack", time: "08:00", status: "checked in" },
    //   { name: "Jessica", time: "09:00", status: "checked in" },
    //   { name: "Peter", time: "08:30", status: "checked in" },
    //   { name: "Tony", time: "09:10", status: "checked in" },
    //   { name: "Tom", time: "09:20", status: "checked in" },
    //   { name: "Abc", time: "09:30", status: "checked in" },
    //   { name: "Doyouno", time: "09:40", status: "checked in" },
    //   { name: "Jason", time: "10:00", status: "checked in" },
    //   { name: "Look", time: "10:10", status: "checked in" },
    //   { name: "View", time: "10:20", status: "checked in" },
    //   { name: "Todo", time: "10:30", status: "checked in" },
    //   ];
    this.dataSource = new MatTableDataSource(this.interviewees);

    this.selectDataSource = new MatTableDataSource(this.selectDataItems);
    this.selectDataSource.sort = this.sortBySelect;
    delete this.dataSourceFieldSortMap.time;
    this.dataSourceSort();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  checkboxLabel(data: any, index: number): void {

    const dataItem: Interviewees[] = this.dataSource.data;
    const row: Interviewees = dataItem.splice(index, 1)[0];

    const cloneRow = JSON.parse(JSON.stringify(row));
    cloneRow.status = 'interviewed';

    this.selectDataItems.push(cloneRow);

    this.dataSource = new MatTableDataSource(dataItem);
    // move data
    this.selectDataSource = new MatTableDataSource(this.selectDataItems);

    delete this.dataSourceSelectFieldSortMap.time;
    setTimeout(() => {
      this.sortData();
    }, 200);
  }

  sortData(field: string = 'time'): void {
    this.dataSourceSelectFieldSortMap[field] = !this.dataSourceSelectFieldSortMap[field];
    if (this.dataSourceSelectFieldSortMap[field]) {
      this.selectDataItems.sort((a, b) => a[field].localeCompare(b[field]));
    } else {
      this.selectDataItems.sort((a, b) => b[field].localeCompare(a[field]));
    }
    this.selectDataSource = new MatTableDataSource(this.selectDataItems);
  }

  dataSourceSort(field: string = 'time'): void {
    this.dataSourceFieldSortMap[field] = !this.dataSourceFieldSortMap[field];
    const dataItem: Interviewees[] = this.dataSource.data;
    if (this.dataSourceFieldSortMap[field]) {
      dataItem.sort((a, b) => a[field].localeCompare(b[field]));
    } else {
      dataItem.sort((a, b) => b[field].localeCompare(a[field]));
    }
    this.dataSource = new MatTableDataSource(dataItem);
  }

  getInterviews(careerfair) {
    for ( var j=0; j<careerfair.interviews.length; j++) {
      if (careerfair.interviews[j].company == this.id) {
        this.interviews.push(careerfair.interviews[j]);
        // this.students[i] = this.studentService.getStudentFromDB(careerfair.interview[i].student);
      }
    }
  }

}
