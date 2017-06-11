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

  chartCategory: any;



  idea = {
    $key: '',
    title: '',
    description: '',
    importance: ''
  };


  chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  chartLabels: string[] = ['Test 1', 'Test 2', 'Test 3', 'Test 4'];
  chartType: string = 'bar';
  chartLegend: boolean = true;

  chartData: any[] = [
    { data: [75, 80, 45, 100], label: 'Student A' },
    { data: [80, 55, 75, 95], label: 'Student B' }
  ];

  @ViewChild('doughnutCanvas') doughnutCanvas;

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

  getStat(categoryName){
    return new Chart({

      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
          }
        ]
      }

    });
  }

  loadCharts(summaryData) {
    let cat_names = summaryData.map(category => {
      return category[0];
    });
    let cat_values = summaryData.map(category => {
      return category[1];
    });

    let length = cat_values.length;

    function generateNiceColors(length) {
      let i; let result = [];
      for (i = 0; i < length; i++) {
        const randomInt = (min, max) => {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        let h = randomInt(0, 360);
        let s = randomInt(42, 98);
        let l = randomInt(40, 90);
        result.push(`hsl(${h},${s}%,${l}%)`);
      }
      return result;
    }

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: cat_names,
        datasets: [{
          data: cat_values,
          backgroundColor: generateNiceColors(length),
        }]
      }
    });

  }


}
