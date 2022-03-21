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


  constructor(private http: HttpClient) { }

  getAssetList() {
    return this.http.get(this.urlAllCoins);
  }

  getExchangeRateEUR(assetRequested) {
  
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${assetRequested}?tickers=true&sparkline=true`);
  }
}
