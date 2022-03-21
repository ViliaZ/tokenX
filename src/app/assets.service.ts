import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  requestedAssetID: string = 'litecoin';
  // equals value of input field; per default: bitcoin
  urlAllCoins: string = 'https://api.coingecko.com/api/v3/coins/list?include_platform=false';
  // Attribution required!

  urlExchangeRates: string = `https://api.coingecko.com/api/v3/coins/${this.requestedAssetID}?tickers=true&sparkline=true`;
  // get coin data with exchange rates to fiat currency 

  assetList: object = {};


  constructor(private http: HttpClient) { }

  getAssetList() {
    return this.http.get(this.urlAllCoins);
  }

  getExchangeRateEUR() {
    return this.http.get(this.urlExchangeRates)
  }
}
