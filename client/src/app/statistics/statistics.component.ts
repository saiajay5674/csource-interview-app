import { Component, OnInit } from '@angular/core';
import { CareerfairService } from '../_services/careerfair.service';
import { Careerfair } from '../_models/Careerfair';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  // data: Data[];
  // url = 'http://localhost:58617/API/Charts/GetCharts';
  // Player = [];
  // Run = [];
  doughnutChart = [];
  horizontalBarChart = [];
  barChartLabels = [];
  // constructor(private httpClient: HttpClient) { }
  ngOnInit() {
  //   this.httpClient.get(this.url).subscribe((result: Data[]) => {
  //     result.forEach(x => {
  //       this.Player.push(x.PlayerName);
  //       this.Run.push(x.Run);
      // });
      this
      this.doughnutChart.push(new Chart('canvas1', {
        type: 'doughnut',
        data: {
          labels: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
          datasets: [
            {
              data: [15, 25, 50, 80],
              borderColor: '#000000',
              backgroundColor: [
                "#8B1F41", //vt maroon
                "#75787b", //vt hokie stone
                "#E87722", //vt burnt orange
                "#B6798D"
              ],
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            labels: {
              fontSize: 20
            }
          },
          title: {
            display: true,
            text: 'Attending Students by Class',
            fontSize: 30,
            fontStyle: 'bold'
        }
        }
      }));

      // this.http.get(this.url).subscribe((result: Data[]) => {
      //   result.forEach(x => {
      //     this.Player.push(x.PlayerName);
      //     this.Run.push(x.Run);
      //   });
      this.barChartLabels.push('Computer Science', 'Computer Engineering', 'Business Information Technology', 'Accounting and Information Systems', 'Statistics', 'Computational Modeling and Data Analytics');
      var i;
      for ( i = 0; i < this.barChartLabels.length; i++) {  //wrap long label text
        this.barChartLabels[i] = this.formatLabel(this.barChartLabels[i], 15);
      }
      this
      this.horizontalBarChart.push(new Chart('canvas2', {
        type: 'horizontalBar',
        data: {
          labels: this.barChartLabels,
          datasets: [
            {
              data: [50, 30, 20, 25, 10, 35],
              borderColor: '#000000',
              backgroundColor: [
                "#8B1F41", //vt maroon
                "#75787b", //vt hokie stone
                "#E87722", //vt burnt orange
                "#B6798D",
                "#919395",
                "#F4BB91"
              ],
              fill: true,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
                fontStyle: 'bold'
              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                fontStyle: 'bold'
              }
            }],
          },
          title: {
            display: true,
            text: 'Attending Students by Major',
            fontSize: 30,
            fontStyle: 'bold'
        }
        }
      }));
  }

  formatLabel(str, maxwidth) {  //function to wrap long label text
    var sections = [];
    var words = str.split(" ");
    var temp = "";

    words.forEach(function(item, index) {
        if (temp.length > 0) {
            var concat = temp + ' ' + item;

            if (concat.length > maxwidth) {
                sections.push(temp);
                temp = "";
            }
            else {
                if (index == (words.length-1))
                {
                    sections.push(concat);
                    return;
                }
                else {
                    temp = concat;
                    return;
                }
            }
        }

        if (index == (words.length-1))
        {
            sections.push(item);
            return;
        }

        if (item.length < maxwidth) {
            temp = item;
        }
        else {
            sections.push(item);
        }

    });

    return sections;
  }
}
