import { Component, OnInit } from "@angular/core";
import { CareerfairService } from "../_services/careerfair.service";
import { Careerfair } from "../_models/Careerfair";
import { Chart } from "chart.js";
import { MatGridListModule } from "@angular/material/grid-list";
import { ActivatedRoute } from "@angular/router";
import { StudentService } from "../_services/student.service";
import { Student } from "../_models/Student";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.css"],
})
export class StatisticsComponent implements OnInit {
  doughnutChart = [];
  horizontalBarChart = [];
  barChartLabels = [];
  barChartRows = 2;
  barChartColors = [];
  id: string;
  careerfair: Careerfair = new Careerfair();
  students: Student[];
  majors = [];
  classes = [];
  majorMap = {};
  classMap = {};

  constructor(
    private route: ActivatedRoute,
    private careerfairService: CareerfairService,
    private studentService: StudentService
  ) {
    this.classMap["Freshman"] = 0;
    this.classMap["Sophomore"] = 0;
    this.classMap["Junior"] = 0;
    this.classMap["Senior"] = 0;

    this.id = this.route.snapshot.paramMap.get("id");
    this.getCareerfair(this.id);
  }

  ngOnInit() {}

  setUpGraph() {
    this.doughnutChart.push(
      new Chart("canvas1", {
        type: "doughnut",
        data: {
          labels: Object.keys(this.classMap),
          datasets: [
            {
              data: Object.values(this.classMap),
              borderColor: "#000000",
              backgroundColor: [
                "#8B1F41", //vt maroon
                "#75787b", //vt hokie stone
                "#E87722", //vt burnt orange
                "#B6798D",
              ],
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            labels: {
              fontSize: 15,
            },
          },
          title: {
            display: true,
            text: "Attending Students by Class",
            fontSize: 30,
            fontStyle: "bold",
          },
        },
      })
    );

    this.barChartLabels = Object.keys(this.majorMap);

    this.barChartRows = 2 + Math.trunc(this.barChartLabels.length / 7); //change rowspan based on number of labels

    var j = Math.ceil(this.barChartLabels.length / 6); //check to see how many times we need to push array of colors to barChartColors
    while (j > 0) {
      this.barChartColors.push(
        "#8B1F41",
        "#75787b",
        "#E87722",
        "#B6798D",
        "#919395",
        "#F4BB91"
      );
      j--;
    }

    for (var i = 0; i < this.barChartLabels.length; i++) {
      //wrap long label text
      this.barChartLabels[i] = this.formatLabel(this.barChartLabels[i], 15);
    }
    this.horizontalBarChart.push(
      new Chart("canvas2", {
        type: "horizontalBar",
        data: {
          labels: this.barChartLabels,
          datasets: [
            {
              data: Object.values(this.majorMap),
              borderColor: "#000000",
              backgroundColor: this.barChartColors,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true,
                  fontStyle: "bold",
                },
              },
            ],
            yAxes: [
              {
                display: true,
                ticks: {
                  fontStyle: "bold",
                },
              },
            ],
          },
          title: {
            display: true,
            text: "Attending Students by Major",
            fontSize: 30,
            fontStyle: "bold",
          },
        },
      })
    );
  }

  getCareerfair(id) {
    this.careerfairService.getCareerfair(id).subscribe((record) => {
      this.careerfair = record;
      let majors = this.careerfair.students.map((student) => {
        this.majorMap[student.major] = this.majorMap[student.major] + 1 || 1;
        this.classMap[student.class] = this.classMap[student.class] + 1 || 1;
      });
      this.setUpGraph();
    });
  }

  formatLabel(str, maxwidth) {
    //function to wrap long label text
    var sections = [];
    var words = str.split(" ");
    var temp = "";

    words.forEach(function (item, index) {
      if (temp.length > 0) {
        var concat = temp + " " + item;

        if (concat.length > maxwidth) {
          sections.push(temp);
          temp = "";
        } else {
          if (index == words.length - 1) {
            sections.push(concat);
            return;
          } else {
            temp = concat;
            return;
          }
        }
      }

      if (index == words.length - 1) {
        sections.push(item);
        return;
      }

      if (item.length < maxwidth) {
        temp = item;
      } else {
        sections.push(item);
      }
    });

    return sections;
  }
}
