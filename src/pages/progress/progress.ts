import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Chart} from 'chart.js';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html'
})
export class ProgressPage {

  categories: FirebaseListObservable<any>;
  dataSummary: any;

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  doughnutChart: any;

  constructor(public navCtrl: NavController, public af: AngularFire) {
    this.categories = this.af.database.list('/categories');

    this.categories.subscribe(categories => {
      this.dataSummary = categories.map(category => {

        let entries = Object.keys(category.entries).map(function (key) {
          return category.entries[key];
        });

        let entry = Object.keys(entries).map(function (key) {
          return entries[key];
        });

        let count = 0;
        entry.forEach(e => {
          console.log(e.status);
          if (e.status === false) ++count;
        });

        return [category.title, count];
      });
      this.loadCharts(this.dataSummary);
    });
  }


  loadCharts(summaryData) {
    let cat_names = summaryData.map(category => {
      return category[0];
    });
    let cat_values = summaryData.map(category => {
      return category[1];
    });

    function randomColorGenerator() {
      return '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
    }

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: cat_names,
        datasets: [{
          data: cat_values,
          fillColor: randomColorGenerator(),
          strokeColor: randomColorGenerator(),
          highlightFill: randomColorGenerator(),
          highlightStroke: randomColorGenerator()
        }]
      }
    });

    // this.lineChart = new Chart(this.lineCanvas.nativeElement, {
    //
    //   type: 'line',
    //   data: {
    //     labels: ["January", "February", "March", "April", "May", "June", "July"],
    //     datasets: [
    //       {
    //         label: "My First dataset",
    //         fill: false,
    //         lineTension: 0.1,
    //         backgroundColor: "rgba(75,192,192,0.4)",
    //         borderColor: "rgba(75,192,192,1)",
    //         borderCapStyle: 'butt',
    //         borderDash: [],
    //         borderDashOffset: 0.0,
    //         borderJoinStyle: 'miter',
    //         pointBorderColor: "rgba(75,192,192,1)",
    //         pointBackgroundColor: "#fff",
    //         pointBorderWidth: 1,
    //         pointHoverRadius: 5,
    //         pointHoverBackgroundColor: "rgba(75,192,192,1)",
    //         pointHoverBorderColor: "rgba(220,220,220,1)",
    //         pointHoverBorderWidth: 2,
    //         pointRadius: 1,
    //         pointHitRadius: 10,
    //         data: [65, 59, 80, 81, 56, 55, 40],
    //         spanGaps: false,
    //       }
    //     ]
    //   }

    // });

  }
}
