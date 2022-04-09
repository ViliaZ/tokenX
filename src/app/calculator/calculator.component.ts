import { Component, OnInit, Output, EventEmitter, HostListener, SimpleChanges } from '@angular/core';

import { firstValueFrom } from 'rxjs';
import { AssetsService } from '../Services/assets.service';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  public showList: any = true;  // if inputfield in focus

  assetInput: string = 'Bitcoin';
  amountInput: number = 1;

  amountInEUR: number = 0;
  priceInEUR: number = 0;
  priceInUSD: number = 0;

  assetList: any = [];
  filteredAsset: any = [];


  public requestedAssetID: any = 'bitcoin';

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

  getAssetList() {
    this.assetService.getAssetList()
      .subscribe((data) => { this.assetList = data; })
  }

  // process data from input field
  getSearchData() {
    this.filteredAsset = [];

    if (this.assetInput.length == 0) {
      this.requestedAssetID = 'bitcoin';
    }
    // check if PARTLY the input string is matching an actual asset in my list
    if (this.assetInput.length > 1) {  // min search: 3 characters
      for (let i = 0; i < this.assetList.length; i++) {
        // restrict array to 6 items 
        if (this.assetList[i].id.includes(this.assetInput.toLowerCase()) && this.filteredAsset.length < 6) {
          this.filteredAsset.push(this.assetList[i].id);
        }
        // check for COMPLETE string is correct and mathcing an actual asset
        if (this.assetList[i].id == this.assetInput.toLowerCase()) {
          this.requestedAssetID = this.assetList[i].id;
          this.assetService.requestedAssetID = this.assetList[i].id;
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

  // toggle for show/notshow list of alternative search options
  toggleList(showList: boolean) {
    if (showList == true) {
      this.showList = true;
    }
    else {
      this.showList = false;
    }
  }

  // clicked on a option from list
  updateRequestedAsset(asset: string, event: Event) {
    event.stopPropagation();
    this.requestedAssetID = asset;
    this.showList = false;
  }

  // close List of Asset Options, when Click SOMEWHERE on the page 
  @HostListener("document:click", ['$event.target.id'])
  clickOnPage(id: string) {
    // template Ids for input and List are checked --> prevent closing list in these cases
    if (id != 'listAssetOptions' && id != 'inputfieldSearchAsset') {
      this.showList = false;
    }
  }



  }

