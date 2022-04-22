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
  requestedAssetID: string = 'Bitcoin'; // from input field
  priceInEUR: any = 0; // for calculation input field
  amountInput: number = 1;


  constructor(private http: HttpClient) {
  }

  getAssetList() {
    // in order of market cap
    console.log(' 111 getassetList');
    // reference prices in Eur
    return this.http.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
  }

  getExchangeRateEUR(assetRequested) {
    console.log('222 getExchangeEUR');
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${assetRequested.toLowerCase()}?tickers=true&sparkline=true`);
  }

  getAssetWeeklyData(assetRequested) {
    console.log('333 weekly data');
    // in Euro
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${assetRequested.toLowerCase()}/market_chart?vs_currency=eur&days=30&interval=daily`);
  }

  getAssetDayData(assetRequested) {
    console.log('444 day data');
    // in Euro
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${assetRequested.toLowerCase()}/market_chart?vs_currency=eur&days=1&interval=minute`);
  }


  getAssetDetails(assetRequested) {
    console.log('555 details');
    // thumbnail, infotext
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${assetRequested.toLowerCase()}`);
  }

  getMarketInfos() {
    console.log('666 marketInfos');
    // thumbnail, infotext
    return this.http.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
  }

  async calculateExchange() {
    try {
      let res = await firstValueFrom(this.getExchangeRateEUR(this.requestedAssetID.toLowerCase()));
      this.priceInEUR = (res['market_data']['current_price']['eur']) * this.amountInput;
    }
    catch (error) {
      console.error('calc exchange error:', error);
    }
  }

}
