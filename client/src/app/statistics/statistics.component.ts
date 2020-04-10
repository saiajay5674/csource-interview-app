import { Component, OnInit } from '@angular/core';
import { CareerfairService } from '../_services/careerfair.service';
import { Careerfair } from '../_models/Careerfair';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
