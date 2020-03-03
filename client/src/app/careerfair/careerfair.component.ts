import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';





@Component({
  selector: 'app-careerfair',
  templateUrl: './careerfair.component.html',
  styleUrls: ['./careerfair.component.css']
})

export class CareerfairComponent implements OnInit {

  public displayedColumns = ['semester', 'companies', 'interviewees', 'interviews', 'details', 'update', 'delete'
];
  public dataSource = new MatTableDataSource<CareerfairComponent>();

  constructor() { }

  ngOnInit() {
    this.getAllCareerFairs();
  }

  public getAllCareerFairs = () => {
    // this.repoService.getData('api/owner')
    // .subscribe(res => {
    //   this.dataSource.data = res as CareerfairComponent[];
    // })
  }

  public redirectToDetails = (id: string) => {

  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }

}
