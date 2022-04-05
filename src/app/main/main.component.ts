import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AssetsService } from '../Services/assets.service';
import { CalculatorComponent } from '../calculator/calculator.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  @Input() currentTab: string = 'graph'

  public assetInfotext: any = '';
  public assetWebsite: any = ''

  requestedAssetID: any;

  constructor(private assets: AssetsService) { }

  ngOnInit(): void {
  }


  // getting Data form EventEmitter (child comp: Calculator) 
  getRequestedAssedID(assetFromCalculator: any) {
    this.requestedAssetID = assetFromCalculator;
  }

  getInfoTextData() {
    console.log('requested Asset ID for Text: ', this.requestedAssetID);

    // try {
    //   this.assets.getAssetDetails(this.requestedAssetID)
    //     .subscribe((results: any) => {
    //       this.assetInfotext = results.description.en;
    //       this.assetWebsite = results.links.homepage[0];
    //     })
    // } catch (error) {
    //   console.error(error);
    // }
  }



}
