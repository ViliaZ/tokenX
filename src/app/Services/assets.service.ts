import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  // allCoins: string = 'https://api.coingecko.com/api/v3/coins/list?include_platform=false';
  // Attribution required!

  assetList: object = {};
  requestedAssetID: string = 'bitcoin'; // from input field
  priceInEUR: any = 0; // for calculation input field
  amountInput: number = 1;


  constructor(private http: HttpClient) {
  }

  getAssetList() {
    // in order of market cap
    // reference prices in Eur
    return this.http.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
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

  async calculateExchange() {
    console.log('exchangerequest', this.requestedAssetID)
    try {
      let res = await firstValueFrom(this.getExchangeRateEUR(this.requestedAssetID));
      this.priceInEUR = (res['market_data']['current_price']['eur']) * this.amountInput;
      console.log('priceinEUR new', this.priceInEUR)
    }
    catch (error) {
      console.error('calc exchange error:', error);
    }
  }

}
