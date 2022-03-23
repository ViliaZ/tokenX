import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AssetsService } from '../assets.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  assetInput: string = '';
  amountInput: number = 1;

  amountInEUR: number = 0;
  assetList: any = [];

  requestedAssetID: string = 'litecoin';

  priceInEUR: number = 0;
  priceInUSD: number = 0;

  filteredAsset: any = [];
  //   Format: 

  //   "id": "bitcoin",
  //   "symbol": "btc",
  //   "name": "Bitcoin"
  // },

  constructor(private assetService: AssetsService) {
  }

  ngOnInit(): void {
    this.getAssetList();
    this.findRequestedAsset();
    this.calculateExchange();
  }

  ngOnChanges(){    
  }

  getAssetList() {
    this.assetService.getAssetList().subscribe((data) => { this.assetList = data; console.log('assetList', this.assetList); })
  }

  findRequestedAsset() {
    this.filteredAsset = [];

    if (this.assetInput.length > 3) {
      for (let i = 0; i < this.assetList.length; i++) {
        if (this.assetList[i].id.includes(this.assetInput.toLowerCase())) {
          this.filteredAsset.push(this.assetList[i].id)
        }
        if (this.assetList[i].id == this.assetInput.toLowerCase()) {
          this.requestedAssetID = this.assetList[i].id
        }
      }
      this.calculateExchange();
    }
  };


  async calculateExchange() {
    let fetchResult = await firstValueFrom(this.assetService.getExchangeRateEUR(this.requestedAssetID));
    this.priceInEUR = (fetchResult['market_data']['current_price']['eur']) * this.amountInput;
  }

}
