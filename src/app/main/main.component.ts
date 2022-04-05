import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AssetsService } from '../Services/assets.service';
import { FooterComponent } from '../footer/footer.component';
import { ImprintComponent } from '../imprint/imprint.component';
import { CalculatorComponent } from '../calculator/calculator.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  @Input() currentTab: string = 'graph'
  @ViewChild('calculator') calculatorComponent: CalculatorComponent;

  public assetInfotext: any = '';
  public assetWebsite: any = ''
  public requestedAssetID: any;

  constructor(private assets: AssetsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): any {
    setTimeout(() => {
      this.requestedAssetID = this.calculatorComponent.requestedAssetID;
      this.getInfoTextData();
    }, 2000);
  }

  ngOnChanges() {
    console.count();
    setTimeout(()=> {this.getInfoTextData()},1000);

  }

  getInfoTextData() {
    console.log('requested Asset ID neu: ', this.requestedAssetID);

    try {
      this.assets.getAssetDetails(this.requestedAssetID)
        .subscribe((results: any) => {
          this.assetInfotext = results.description.en;
          this.assetWebsite = results.links.homepage[0];
        })
    } catch (error) {
      console.error('error', error);
    }


  }



}
