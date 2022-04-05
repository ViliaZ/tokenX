import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  urlAllCoins: string = 'https://api.coingecko.com/api/v3/coins/list?include_platform=false';
  // Attribution required!

  assetList: object = {};
  requestedAssetID: string = 'bitcoin'; // from input field


  constructor(private http: HttpClient) {
  }

  getAssetList() {
    return this.http.get(this.urlAllCoins);
  }

  getExchangeRateEUR(assetRequested) {
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${assetRequested}?tickers=true&sparkline=true`);
  }

  getAssetWeeklyData(assetRequested) {
    // in Euro
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${assetRequested}/market_chart?vs_currency=eur&days=30&interval=daily`);
  }

  getAssetDayData(assetRequested) {
    // in Euro
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${assetRequested}/market_chart?vs_currency=eur&days=1&interval=minute`);
  }


  getAssetDetails(assetRequested) {
    // thumbnail, infotext
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${assetRequested}`);
  }

  getMarketInfos() {
    // thumbnail, infotext
    return this.http.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
  }



}
