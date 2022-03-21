import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AssetsService } from '../assets.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  assetInput: string = '';
  amountInput: any;

  amountInEUR: number = 0;
  assetList: any = {};

  requestedAssetID: string = '';

  priceInEUR: number = 0;
  priceInUSD: number = 0;

  filteredAsset: any = [];

  constructor(private assetService: AssetsService) { }

  //   Format: 

  //   "id": "bitcoin",
  //   "symbol": "btc",
  //   "name": "Bitcoin"
  // },

  ngOnInit(): void {
    this.getAssetList();
  }

  getAssetList() {
    let result = this.assetService.getAssetList().subscribe((data) => { this.assetList = data; console.log(this.assetList); })
  }



  findRequestedAsset() {
    this.filteredAsset = [];
    for (let i = 0; i < this.assetList.length; i++) {
      if (this.assetList[i].id.includes(this.assetInput.toLowerCase())) {
        this.filteredAsset.push(this.assetList[i].id)
      }
      if (this.assetList[i].id == this.assetInput.toLowerCase()) {
        // console.log(this.assetList[i])
        this.requestedAssetID = this.assetList[i].id
      }
    }
    this.assetService.requestedAssetID = this.requestedAssetID;
    // console.log(this.filteredAsset)
  };

  calculateExchange() {
    console.log('asset from service:',this.assetService.requestedAssetID );
    
    this.assetService.getExchangeRateEUR().subscribe((data: any) => {
      console.log('exchangerate', data)
      // console.log('exchangerate', data['market_data']['current_price']['eur'])
      // this.priceInEUR = data['market_data'];
    });


    // console.log('requestedID and EUR',this.requestedAssetID, calculatedEUR);
  }


  //  this.resultFilter = this.assetList.filter((asset: { id: string; }) => {  asset.id == this.assetInput; console.log(this.assetInput,this.resultFilter);



  // console.log('fiat requested', this.assetList);

  // this.assetData = await this.assetService.getExchangeRateEUR();
  // let resultinEUR = this.assetData['market_data']['current_price']['eur'];
  // this.amountInEUR = resultinEUR * this.amountInput;
  // amountInEUR = responseAsJson * this.amountInput;    
}

