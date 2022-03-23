import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AssetsService } from '../assets.service';

@Component({
  selector: 'app-asset-section',
  templateUrl: './asset-section.component.html',
  styleUrls: ['./asset-section.component.scss']
})
export class AssetSectionComponent implements OnInit {
  // allAssetsInfo: any = {};
  currentPrices: any[] = [];
  marketCaps: any[] = [];
  assetNames: any[] = [];
  assetRanks: any[] = [];
  images: any[] = [];


  constructor(private assetService: AssetsService) { }

  ngOnInit(): void {
    this.getAssetInfos();
  }

  //fetch Infos for main Assets ranking 1-5 in  Market Cap
  async getAssetInfos() {
    this.currentPrices = [];
    this.marketCaps = [];
    this.assetNames = [];
    this.assetRanks = [];

    // get Info from top 5 market ranked assets (they are in correct order)
    let allAssetsInfo: any = await firstValueFrom(this.assetService.getMarketInfos());
    // loop over the object (it is not an Array!! --> map() will not functioning
    let result = allAssetsInfo.map((asset: any) => {
      this.assetNames.push(asset['id']);
      this.assetRanks.push(asset['market_cap_rank']);
      this.marketCaps.push(asset['market_cap']);
      this.currentPrices.push(asset['current_price']);
    })
    console.log('result', allAssetsInfo[0]);

  }


}
