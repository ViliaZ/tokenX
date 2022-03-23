import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AssetsService } from '../assets.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  dates: any = [];
  prices: any[] = [];
  marketCaps: any[] = [];
  volumes: any[] = [];

  @Input() requestedAssetID;  // is synchronous calculator input, property binding in main component

  constructor(private assetService: AssetsService) { }

  ngOnInit(): void {
  }

  ngOnChanges(){   
    this.getTableData();
  }

  async getTableData() {
    this.dates = [];
    this.prices = [];
    this.volumes = [];
    this.marketCaps = [];
    let monthData = await firstValueFrom(this.assetService.getAssetWeeklyData(this.requestedAssetID));
    // save all parameters in seperate Arrays
    monthData['prices'].map((datapoint) => {
      // output of datapoint is Date in milliseconds --> need to format it in real calender Format
      let calendarDate = new Date(datapoint[0]);
      let options: any = { year: 'numeric', month: 'numeric', day: 'numeric' };
      let dateFormatted = calendarDate.toLocaleDateString('en-us', options);  // german formatting; other Options: en oder other languages 
      this.dates.push(dateFormatted);
    })
    monthData['prices'].map((datapoint) => {
      let dayPrice = datapoint[1]
      this.prices.push(dayPrice.toFixed(2).replace('.',','))
    })
    monthData['market_caps'].map((datapoint) => { 
      let marketCap: number = datapoint[1].toFixed(0);
      let marketCapFormatted = this.moneyFormatter(marketCap);
      this.marketCaps.push(marketCapFormatted);      
    })
    monthData['total_volumes'].map((datapoint) => { 
      let dayVolume = datapoint[1].toFixed(0)
      let volumeFormatted = this.moneyFormatter(dayVolume);
      this.volumes.push(volumeFormatted)
    })
  }

  moneyFormatter(number){
    let numberFormatted = new Intl.NumberFormat();
    let result = numberFormatted.format(number)
    return result
  }

}



