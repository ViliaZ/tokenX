import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AssetsService } from '../Services/assets.service';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-asset-section',
  templateUrl: './asset-section.component.html',
  styleUrls: ['./asset-section.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AssetSectionComponent implements OnInit {
  // allAssetsInfo: any = {};
  currentPrices: any[] = [];
  marketCaps: any[] = [];
  assetNames: any[] = [];
  assetRanks: any[] = [];
  images: any[] = [];
  changePercent: any[] = [];

  constructor(public assetService: AssetsService) { }

  ngOnInit(): void {
    this.getAssetInfos();
  }

  //fetch Infos for main Assets ranking 1-5 in  Market Cap
  async getAssetInfos() {
    this.currentPrices = [];
    this.marketCaps = [];
    this.assetNames = [];
    this.assetRanks = [];
    this.images = [];
    this.changePercent = []; // 24h change in percent
    try {
      // get Info from top 5 market ranked assets (they are in correct order)
      let allAssetsInfo: any = await firstValueFrom(this.assetService.getMarketInfos());
      console.log('NEU', typeof this.assetService.getMarketInfos());

      allAssetsInfo.map((asset: any) => {
        this.assetNames.push(asset['id']);
        this.assetRanks.push(asset['market_cap_rank']);
        this.marketCaps.push(asset['market_cap']);
        this.currentPrices.push(asset['current_price']);
        this.images.push(asset['image'])
        this.changePercent.push(asset['price_change_percentage_24h'])
      })
    } catch (error) {
      console.error('error in getAssetInfos():', error);
    }

    // loop over the object (it is not an Array!! --> map() will not functioning
  }


showAsset(asset:string){
  this.assetService.requestedAssetID = asset;
  this.assetService.calculateExchange();
}

}
