import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AssetsService } from '../Services/assets.service';
import { firstValueFrom } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';



@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})


export class GraphComponent implements OnInit, AfterViewInit {

  prices: any = [];
  dates: any = [];
  chart: any = {};

  @ViewChild(BaseChartDirective, { static: true }) mychart: BaseChartDirective;
  @ViewChild('mycanvas') canvas: ElementRef;
  @ViewChild('graphContainer') graphContainer: ElementRef;
  
  lineChartColors;


  @Input() requestedAssetID;  // is synchronous calculator input, property binding in main component

  chartDirective: any;
  changeDetectorRef: any;


  constructor(private assetService: AssetsService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const ctx = this.canvas.nativeElement.getContext('2d');

    let gradientFill = ctx.createLinearGradient(0, 0, 200, 50);
    gradientFill.addColorStop(0, 'green');
    gradientFill.addColorStop(.5, 'cyan');
    gradientFill.addColorStop(1, 'green');

    ctx.borderColor = 'green';
    ctx.backgroundColor = gradientFill;
    ctx.strokeStyle = gradientFill;
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

  // @HostListener('window:resize', ['$event'])
  // onWindowResize() {
  //   let width = this.graphContainer.nativeElement.parentNode.getBoundingClientRect().width;
  //   console.log('width ',width);
  //   console.log('width parentnode',this.graphContainer.nativeElement.parentNode);
  //   this.canvas.nativeElement.style.width = width;
  
    
  // }


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

      let options: any = { formatMatcher: 'basic', hour: 'numeric', minute: 'numeric', hourCycle: 'h12' };
      let dateFormatted = calendarDate.toLocaleDateString('de', options);
      let cutOutDay = dateFormatted.split(','); // we just need the time, without the day
      this.dates.push(cutOutDay[1]); // only push "hour" to use as graph data
    });
    graphdata['prices'].map((datapoint) => {
      this.prices.push(datapoint[1]);
    })
  }

  getColor() {

    const ctx = this.canvas.nativeElement.getContext('2d');

    let gradientFill = ctx.createLinearGradient(0, 20, 300, 800);
    gradientFill.addColorStop(0.1, '#13e2a4');
    gradientFill.addColorStop(0.8, '#e902b3');
    gradientFill.addColorStop(1, '#e902b3');


    ctx.borderColor = 'green';
    ctx.backgroundColor = gradientFill;
    ctx.strokeStyle = gradientFill;

    return gradientFill
  }

  assembleChart() {
    // configuration options here: https://www.chartjs.org/docs/latest/charts/line.html
    this.chart = new Chart('mycanvas', {
      type: 'line',
      options: {
        transitions: {
          hide: {
            animations: {
              x: {
                to: 0
              },
              y: {
                to: 0
              }
            }
          }
        },
        responsive: true,
        scales: {
          x: {   // text x axis
            ticks: {
              color: 'white'
            }
          },
          y: {  // text y axis
            ticks: {
              autoSkip: false,
              color: 'white'
            },
            title: {
              display: true,
              text: 'Amount in Euros',
              color: 'white',
              font: {
                size: 12,
              }
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
            label: '24-Hour view',
            backgroundColor: this.getColor(),
            borderColor: 'white', // line color
            borderWidth: 1, // thickness of line in px
            fill: true,
            pointBorderColor: 'white',
            pointBackgroundColor: 'transparent',  // fill color points
            pointBorderWidth: 1, // thickness point border
            pointRadius: 2,
            pointStyle: 'point',
          },
        ],
      },
    });
  }
}
