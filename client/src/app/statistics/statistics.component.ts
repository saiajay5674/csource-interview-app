import { Component, OnInit } from '@angular/core';
import { CareerfairService } from '../_services/careerfair.service';
import { Careerfair } from '../_models/Careerfair';
import { Chart } from 'chart.js';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  doughnutChart = [];
  horizontalBarChart = [];
  doughnutChartLabels = [];
  barChartLabels = [];
  barChartRows = 2;
  barChartColors = [];
  id: string;
  careerfair: Careerfair = new Careerfair();
  majors = [];
  majorsData = [];
  classes = [];
  classesData = [];

  constructor(
    private route: ActivatedRoute,
    private careerfairService: CareerfairService
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getChartContents(this.id);

    setTimeout(() => {
    this
    this.doughnutChart.push(new Chart('canvas1', {
      type: 'doughnut',
      data: {
        labels: this.doughnutChartLabels,
        datasets: [
          {
            data: this.classesData,
            borderColor: '#000000',
            backgroundColor: [
              "#8B1F41", //vt maroon
              "#75787b", //vt hokie stone
              "#E87722", //vt burnt orange
              "#B6798D",
              "#919395",
              "#F4BB91"
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
            fontSize: 15
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

    this.barChartRows = 2 + Math.trunc(this.barChartLabels.length / 7); //change rowspan based on number of labels

    var j = Math.ceil(this.barChartLabels.length / 6); //check to see how many times we need to push array of colors to barChartColors
    while (j > 0) {
      this.barChartColors.push('#8B1F41', '#75787b', '#E87722', '#B6798D', '#919395', '#F4BB91');
      j--;
    }

    for ( var i = 0; i < this.barChartLabels.length; i++) {  //wrap long label text
      this.barChartLabels[i] = this.formatLabel(this.barChartLabels[i], 15);
    }

    this
    this.horizontalBarChart.push(new Chart('canvas2', {
      type: 'horizontalBar',
      data: {
        labels: this.barChartLabels,
        datasets: [
          {
            data: this.majorsData,
            borderColor: '#000000',
            backgroundColor: this.barChartColors,
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
  }, 1000);
  }

  getChartContents(id) {
    this.careerfairService.getCareerfair(id).subscribe((record) => {
      this.careerfair = record;

      this.classes = this.careerfair.students.map(student => student.class);
      console.log(this.classes);
      this.doughnutChartLabels = Array.from(new Set(this.classes));
      console.log(this.doughnutChartLabels);
      for (let i = 0; i < this.doughnutChartLabels.length; i++) {
        let count = 0
        for (let j = 0; j < this.careerfair.students.length; j++) {
          if (this.doughnutChartLabels[i] === this.careerfair.students[j].class) {
            count++;
          }
          this.classesData[i] = count;
        }
      }
      console.log(this.classesData);

      this.majors = this.careerfair.students.map(student => student.major);
      console.log(this.majors);
      this.barChartLabels = Array.from(new Set(this.majors));
      console.log(this.barChartLabels);
      for (let i = 0; i < this.barChartLabels.length; i++) {
        let count = 0
        for (let j = 0; j < this.careerfair.students.length; j++) {
          if (this.barChartLabels[i] === this.careerfair.students[j].major) {
            count++;
          }
          this.majorsData[i] = count;
        }
      }
      console.log(this.majorsData);

    });
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
