import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AssetsService } from '../Services/assets.service';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  assetInput: string = 'Bitcoin';
  amountInput: number = 1;

  amountInEUR: number = 0;
  priceInEUR: number = 0;
  priceInUSD: number = 0;

  assetList: any = [];
  filteredAsset: any = [];
  requestedAssetID: any = 'bitcoin';

  // @Output() requestedAsset = new EventEmitter<any>(); // 'bitcoin';

  //   Format INFO from API: 
  //      "id": "bitcoin",
  //      "symbol": "btc",
  //      "name": "Bitcoin"


  constructor(private assetService: AssetsService) { }

  ngOnInit(): void {
    this.getAssetList();
    this.getSearchData();
    this.calculateExchange();
  }

  // emitNewAssetSearch(value: string) {
  //   this.requestedAsset.emit(this.requestedAssetID);
  // }


  getAssetList() {
    this.assetService.getAssetList()
      .subscribe((data) => { this.assetList = data; })
  }

  getSearchData() {
    this.filteredAsset = [];

    if (this.assetInput.length > 3) {  // min search: 3 characters
      for (let i = 0; i < this.assetList.length; i++) {
        if (this.assetList[i].id.includes(this.assetInput.toLowerCase())) {
          this.filteredAsset.push(this.assetList[i].id)
        }
        if (this.assetList[i].id == this.assetInput.toLowerCase()) {
          this.requestedAssetID = this.assetList[i].id;
          // this.emitNewAssetSearch(this.requestedAssetID)
        }
      }
      this.calculateExchange();
    }
  };


  async calculateExchange() {
    try {
      let res = await firstValueFrom(this.assetService.getExchangeRateEUR(this.requestedAssetID));
      this.priceInEUR = (res['market_data']['current_price']['eur']) * this.amountInput;
    } 
    catch (error) {
      console.error('calc exchange error:', error);
    }
  }

}
