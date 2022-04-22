import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { AssetsService } from '../Services/assets.service';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  @ViewChild('inputNumber') inputNumber: ElementRef;
  @ViewChild('assetSearch') assetSearch: ElementRef;
  public showList: any = true;  // if inputfield in focus
  public requestedAssetID: any = this.assetService.requestedAssetID;
  public exchangePrice: any = 0;  // this will be toFixed() and become a string, therefore type is string, not number
  public previousSearchAsset: string;  // if defautlDirection is false, requestedAssetID will not work (Inputfield.length = 0 and it would always be bitcoin)

  assetInput: any = this.assetService.requestedAssetID;
  amountInEUR: number = 0;
  assetList: any = [];
  filteredAsset: any = [];

 
  constructor(public assetService: AssetsService) { }

  ngOnInit(): void {
    this.getAssetList();
    this.getSearchData();
    this.assetService.calculateExchange();
  }

  getAssetList() {
    this.assetService.getAssetList()
      .subscribe((data) => {
        console.log('Calculator: getassetList');

        this.assetList = data
      })
  }

  // process data from input field
  getSearchData() {
    this.filteredAsset = [];
    if (this.assetInput.length == 1) {
      this.assetService.requestedAssetID = 'Bitcoin';
    }
    // check if PARTLY the input string is matching an actual asset in my list
    if (this.assetInput.length > 0) {  // min search: 2 characters
      this.getMatchingAssets();
    }
  };

  // Goal: get LIst of max 6 items to propose for searchInput
  getMatchingAssets() {
    for (let i = 0; i < this.assetList.length; i++) {
      if (this.assetList[i].id.includes(this.assetInput.toLowerCase()) && this.filteredAsset.length < 6) {
        this.filteredAsset.push(this.assetList[i].id);
      }
      // check for COMPLETE string is correct and matching an actual asset
      if (this.assetList[i].id == this.assetInput.toLowerCase()) {
        this.assetService.requestedAssetID = this.assetList[i].id;
        this.assetService.calculateExchange();
      }
    }
  }

  // toggle for show/notshow list of alternative search options
  toggleList(showList: boolean) {
    if (showList == true) {
      this.showList = true;
    }
    else {
      this.showList = false;
    }
  }

  // clicked on a option from list
  updateRequestedAsset(asset: string, event: Event) {
    event.stopPropagation();
    this.assetService.requestedAssetID = asset;
    this.assetService.calculateExchange();
    this.showList = false;
  }

  // close List of Asset Options, when Click SOMEWHERE on the page 
  @HostListener("document:click", ['$event.target.id'])
  clickOnPage(id: string) {
    // template Ids for input and List are checked --> prevent closing list in these cases
    if (id != 'listAssetOptions' && id != 'inputfieldSearchAsset') {
      this.showList = false;
    }
  }

  toggleConversion() {
    this.previousSearchAsset = this.assetService.requestedAssetID; // if we would take requestedAssetID (as always) it would always be Bitcoin, because input field is empty
    if (this.assetService.defaultDirection) {
      this.exchangePrice = this.calcexchangePrice();
      this.assetService.defaultDirection = false;
      setTimeout(()=>{ this.inputNumber.nativeElement.focus()},200)
     
    }
    else { // get back to default     
      this.assetInput = this.previousSearchAsset;
      this.assetService.defaultDirection = true;
      setTimeout(()=>{ this.assetSearch.nativeElement.focus()},300)
    }
  }

  calcexchangePrice() {
    if (this.assetService.priceInEUR > 1000) {
      return (1 / this.assetService.priceInEUR).toFixed(6);
    }
    else if (this.assetService.priceInEUR > 10000) {
      return (1 / this.assetService.priceInEUR).toFixed(8);
    }
    else if (this.assetService.priceInEUR > 100000) {
      return (1 / this.assetService.priceInEUR).toFixed(10);
    }
    else {
      return (1 / this.assetService.priceInEUR).toFixed(4);
    }
  }

  // Trigger: only if this.assetService.defaultDirection = false;
  calculateReverseExchange() {
    this.exchangePrice = this.exchangePrice * this.assetService.amountInput;
    // this.inputNumber.nativeElement.focus();
  }

}

