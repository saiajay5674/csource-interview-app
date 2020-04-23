import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Careerfair } from '../_models/Careerfair';
import { CareerfairService } from '../_services/careerfair.service';
import { Interview } from '../_models/Interview';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../_models/Student';
import { Company } from '../_models/Company';
import { CompanyService } from '../_services/company.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/User';
import { InterviewService } from '../_services/interview.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-checked-students',
  templateUrl: './checked-students.component.html',
  styleUrls: ['./checked-students.component.css']
})
export class CheckedStudentsComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['name', 'time', 'status', 'checked', 'delete'];

  dataSource: MatTableDataSource<Interview>;
  selectDataSource: MatTableDataSource<Interview>;

  @ViewChild(MatSort, { static: false }) sortBySelect: MatSort;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public selectDataItems: Interview[] = [];

  interviews: Interview[] = [];
  students: Student[];
  careerfair: Careerfair;
  company: Company;
  id:string;
  currentUser: User;

  dataSourceFieldSortMap: any = {};
  dataSourceSelectFieldSortMap: any = {};

  constructor(
    private careerfairService: CareerfairService,
    private companyService: CompanyService,
    private authService: AuthService,
    private interviewService: InterviewService,
    private route: ActivatedRoute) {
      this.id = this.route.snapshot.paramMap.get("id");
      this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.companyService.getCompanyByUser(this.id).subscribe ( (record) => {
      this.company = record;
      console.log(this.company);
    })

    this.careerfairService.getCurrentInterviews(this.id).subscribe( (records) => {
      this.careerfair = records;
      console.log(this.careerfair.interviews.map(elem => elem.student));
      this.getInterviews(this.careerfair);
    })

    this.dataSource = new MatTableDataSource(this.interviews);

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

    const dataItem: Interview[] = this.dataSource.data;
    const row: Interview = dataItem.splice(index, 1)[0];
    this.interviewService.updateComplete(row._id).pipe(first()).subscribe( (result) => {})

    const cloneRow = JSON.parse(JSON.stringify(row));
    this.selectDataItems.push(cloneRow);

    this.dataSource = new MatTableDataSource(this.interviews);
    // move data
    this.selectDataSource = new MatTableDataSource(this.selectDataItems);

    delete this.dataSourceSelectFieldSortMap.time;
    setTimeout(() => {
      this.sortData();
    }, 200);
  }

  removeInterview(index: number): void {

    const dataItem: Interview[] = this.dataSource.data;
    const row: Interview = dataItem.splice(index, 1)[0];

    let interview = {
      _id: this.careerfair._id,
      interviewId: row._id,
    };

    this.careerfairService.removeInterview(interview).subscribe(
      (response) => {
        console.log("\n interview removed ", response, "-\n");
      },
      (error) => {
        console.log("\n error removing ", error, "-\n");
      }
    );

    this.dataSource = new MatTableDataSource(this.interviews);

    delete this.dataSourceSelectFieldSortMap.time;
    setTimeout(() => {
      this.sortData();
    }, 500);
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
    const dataItem: Interview[] = this.dataSource.data;
    if (this.dataSourceFieldSortMap[field]) {
      dataItem.sort((a, b) => a[field].localeCompare(b[field]));
    } else {
      dataItem.sort((a, b) => b[field].localeCompare(a[field]));
    }
    this.dataSource = new MatTableDataSource(dataItem);
  }

  getInterviews(careerfair: Careerfair) {
    for ( var j=0; j<careerfair.interviews.length; j++) {
      if (this.careerfair.interviews[j].company._id === this.company._id) {
        if (!this.careerfair.interviews[j].complete) {
          this.interviews.push(this.careerfair.interviews[j]);
        }
        else {
          this.selectDataItems.push(this.careerfair.interviews[j]);
        }
      }
    }
    console.log(this.interviews);
    this.dataSource = new MatTableDataSource(this.interviews);

    this.selectDataSource = new MatTableDataSource(this.selectDataItems);
    this.selectDataSource.sort = this.sortBySelect;
    delete this.dataSourceFieldSortMap.time;
    this.dataSourceSort();
  }

  isAdmin() {
    return this.currentUser && this.currentUser.role.toLowerCase() === 'admin';
  }

}
