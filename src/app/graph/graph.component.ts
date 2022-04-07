import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AssetsService } from '../Services/assets.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})

export class GraphComponent implements OnInit {

  prices: any = [];
  dates: any = [];
  chart: any = {};
  @Input() requestedAssetID;  // is synchronous calculator input, property binding in main component

  constructor(private assetService: AssetsService) {
    Chart.register(...registerables);
  }

  ngOnChanges() {
    // check if chart object is empty or already in use
    if (Object.keys(this.chart).length === 0) {
      this.drawGraph(this.requestedAssetID);
    }
    else {
      this.chart.destroy();
      this.drawGraph(this.requestedAssetID);
    }
  }

  ngOnInit(): void {
  }

  async drawGraph(asset) {
    this.prices = [];
    this.dates = [];

    try {
      await this.getChartData(asset);
      this.assembleChart();
    }
    catch (error) {
      console.error('error fetching Graph data:', error);
    }
  }

  async getChartData(asset) {
    let graphdata = await firstValueFrom(this.assetService.getAssetDayData(asset));

    graphdata['prices'].map((datapoint) => {
      let calendarDate = new Date(datapoint[0]);
      let options: any = { year: 'numeric', month: 'numeric', day: 'numeric' };
      let dateFormatted = calendarDate.toLocaleDateString('ger', options);
      this.dates.push(dateFormatted);
    });
    graphdata['prices'].map((datapoint) => {
      this.prices.push(datapoint[1]);
    })
  }

  assembleChart() {
    // configuration options here: https://www.chartjs.org/docs/latest/charts/line.html
    this.chart = new Chart('mycanvas', {
      type: 'line',
      options: {
        responsive: true,
        scales: {
          x: {   // text x axis
            ticks: {
              color: 'white'
            }
              // unitStepSize: 
          
            // ticks: {
            //   color: 'white',
              // stepSize: ''
            // }
          },
          y: {  // text y axis
            ticks: {
              color: 'white'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            display: true,  // this the title like "24h view"
            labels: {
              color: 'white', // this the title like "24h view"
            }
          }
        }
      },
      data: {
        labels: this.dates,
        datasets: [
          {
            data: this.prices,
            label: '24 hour view',
            backgroundColor: '#03f8a234', // line fill color
            borderColor: 'white', // line color
            borderWidth: 1, // thickness of line in px
            fill: true,
            pointBorderColor: 'white',
            pointBackgroundColor: 'transparent',  // fill color points
            pointBorderWidth: 1, // thickness point border
            pointRadius: 2,
            pointStyle: 'star',
          },
        ],
      },
    });
  }




}
