import { AfterViewInit, Component, ElementRef, Input, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { AssetsService } from '../Services/assets.service';
import { CalculatorComponent } from '../calculator/calculator.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit, AfterViewInit {

  @Input() currentTab: string = 'graph'

  public assetInfotext: any = 'no data available';
  public assetWebsite!: any;
  public lowestPrice!: any;
  public highestPrice!: any;
  requestedAssetID: any = 'bitcoin'
  public fulltextRequested: boolean = false; // asset text info
  
  @ViewChild(CalculatorComponent) calculatorComp: CalculatorComponent;
  @ViewChild('innerHTMLText') innerHTMLText: ElementRef;


  constructor(public assetService: AssetsService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.lowestPrice, this.highestPrice);
    }, 2000);
  }

  ngAfterViewInit() { // runs only once after Child is initialized
    this.requestedAssetID = this.assetService.requestedAssetID;
    this.getInfoData();
  }


  // update changes in AssetSearch
  ngAfterViewChecked() { // detects changes in Child --> triggers frequently
    if (this.requestedAssetID !== this.assetService.requestedAssetID) {
      this.requestedAssetID = this.assetService.requestedAssetID;
      this.getInfoData();
    }
  }

  // getting Data form EventEmitter (child comp: Calculator) 
  getRequestedAssedID() {
    this.requestedAssetID = this.assetService.requestedAssetID;
  }

  getInfoData() {
    try {
      this.assetService.getAssetDetails(this.assetService.requestedAssetID)
        .subscribe((results: any) => {
          this.assetInfotext = results.description.en;
          this.assetWebsite = results.links.homepage[0];
          this.lowestPrice = results.market_data.low_24h.eur
          this.highestPrice = results.market_data.high_24h.eur;
        })
    } catch (error) {
      console.error(error);
    }
  }

  fullText(request: string) {
    if (request == 'open') {
      this.fulltextRequested = true;

    }
    else {
      this.fulltextRequested = false;
    }
  }





}
