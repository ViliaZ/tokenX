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

  weekPrices: any = [];
  weekInDays: any = [1, 2, 3, 4, 5, 6, 7];
  chart: any = {};
  @Input() requestedAssetID;  // is synchronous calculator input

  constructor(private assetService: AssetsService) {
    Chart.register(...registerables);
  }

  ngOnChanges() {
    console.log('requested is:', this.requestedAssetID);

    // check if chart object is empty or already in use
    if (Object.keys(this.chart).length === 0) {
      console.log('chart obj is empty', this.chart);
      this.drawGraph('bitcoin');
    }
    else {
      this.chart.destroy();
      this.drawGraph(this.requestedAssetID);
      console.log('chart is already filled');
    }
  }

  ngOnInit(): void {
  }

  async drawGraph(asset) {
    console.log('draw graph from this Asset', asset);

    this.weekPrices = [];
    let weeklyPrices = await firstValueFrom(this.assetService.getAssetWeeklyData(asset));
    weeklyPrices['prices'].map((day) => {
      this.weekPrices.push(day[1]);
    })

    console.log('weekPrices',this.weekPrices);

    this.chart = new Chart('mycanvas', {
      type: 'line',
      data: {
        labels: this.weekInDays,
        datasets: [
          {
            data: this.weekPrices,
            borderColor: '#3e95cd',
            fill: false,
            label: 'Last 7 days',
            backgroundColor: 'rgba(93, 175, 89, 0.1)',
            borderWidth: 3,
          },
        ],
      },
    });
  }

getAssetThumbnail(){

}


}
