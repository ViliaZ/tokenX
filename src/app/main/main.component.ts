import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AssetsService } from '../Services/assets.service';
import { CalculatorComponent } from '../calculator/calculator.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  @Input() currentTab: string = 'graph'

  public assetInfotext: any = 'no data available';
  public assetWebsite: any = 'no data available';

  requestedAssetID:any = 'bitcoin'
  public fulltextOpen: boolean = false; // asset text info
 
  @ViewChild(CalculatorComponent) calculatorComp: CalculatorComponent;

  constructor(private assets: AssetsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){ // runs only once after Child is initialized
    this.requestedAssetID = this.calculatorComp.requestedAssetID;
    this.getInfoTextData();
  }

  // update changes in AssetSearch
  ngAfterViewChecked(){ // detects changes in Child --> triggers frequently
  if(this.requestedAssetID !== this.calculatorComp.requestedAssetID ){
    this.requestedAssetID = this.calculatorComp.requestedAssetID; 
    this.getInfoTextData(); }
  }

  // getting Data form EventEmitter (child comp: Calculator) 
  getRequestedAssedID(assetFromCalculator: any) {
    this.requestedAssetID = assetFromCalculator;
  }

  getInfoTextData() {
    try {
      this.assets.getAssetDetails(this.requestedAssetID)
        .subscribe((results: any) => {
          this.assetInfotext = results.description.en;
          this.assetWebsite = results.links.homepage[0];
        })
    } catch (error) {
      console.error(error);
    }
  }

  fullText(request: string){
    if(request == 'open'){
      this.fulltextOpen = true; 
    }
    else {
      this.fulltextOpen = false; 
 
    }
  }

}
