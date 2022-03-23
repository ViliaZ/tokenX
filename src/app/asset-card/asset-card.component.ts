import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AssetsService } from '../assets.service';

@Component({
  selector: 'app-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.scss']
})
export class AssetCardComponent implements OnInit {

  // allAssetsInfo: any = {};
  currentPrices: any [] = [];
  marketCaps: any [] = [];
  assetNames: any [] = [];
  assetRanks:any [] = [];

  constructor(private assetService:AssetsService) { }

  ngOnInit(): void {
    this.getAssetInfos();
  }

  //fetch Infos for main Assets ranking 1-5 in  Market Cap
async getAssetInfos(){
  this.currentPrices = [];
  this.marketCaps = [];
  this.assetNames = [];
  this.assetRanks = [];
  // get Info from top 5 market ranked assets (they are in correct order)
let allAssetsInfo = await firstValueFrom(this.assetService.getMarketInfos());
// loop over the object (it is not an Array!! --> map() will not functioning
  
  console.log(allAssetsInfo);

}

// allAssetsInfo[0].map((asset)=>{
//   this.assetNames.push(asset['id'])




}
