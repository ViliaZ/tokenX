import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AssetsService } from '../assets.service';
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
    console.log('requested is (graph):', this.requestedAssetID);

    // check if chart object is empty or already in use
    if (Object.keys(this.chart).length === 0) {
      // console.log('chart obj is empty', this.chart);
      this.drawGraph(this.requestedAssetID);
    }
    else {
      this.chart.destroy();
      this.drawGraph(this.requestedAssetID);
      // console.log('chart is already filled');
    }
  }

  ngOnInit(): void {
  }

  async drawGraph(asset) {
    console.log('draw graph from this Asset', asset);

    this.prices = [];
    this.dates = [];
    let graphdata = await firstValueFrom(this.assetService.getAssetWeeklyData(asset));
    // 
    graphdata['prices'].map((datapoint) => {
      let calendarDate = new Date(datapoint[0]);
      let options: any = { year: 'numeric', month: 'numeric', day: 'numeric' };
      let dateFormatted = calendarDate.toLocaleDateString('ger', options);
      this.dates.push(dateFormatted);
    });
    graphdata['prices'].map((datapoint) => {
      this.prices.push(datapoint[1]);
    })

    console.log('weekPrices', this.prices);

    this.chart = new Chart('mycanvas', {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [
          {
            data: this.prices,
            borderColor: 'white',
            fill: true,
            label: 'Last 30 days',
            backgroundColor: 'rgba(93, 175, 89, 0.1)',
            borderWidth: 1,
          },
        ],
      },
    });
  }

  getAssetThumbnail() {

  }


}
