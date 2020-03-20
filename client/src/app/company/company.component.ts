import {Component, Input, OnInit, Output} from '@angular/core';
import { Company } from '../_models/Company'

@Component({
  selector: 'company-component',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  @Input() company: Company;

  constructor() { }

  ngOnInit() {
  }

}
