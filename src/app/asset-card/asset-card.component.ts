import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.scss']
})
export class AssetCardComponent implements OnInit {

  img: string = '';

  constructor() { }

  ngOnInit(): void {
    this.getAssetInfos();
  }

  //fetch Infos for main Assets ranking 1-5 in  Market Cap
getAssetInfos(){

}

}
