import { AfterViewInit, Component, OnChanges, ViewChild } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { ImprintComponent } from './imprint/imprint.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnChanges{
  title = 'tokenX';

  imprintOpen:boolean = false;

  @ViewChild(FooterComponent) footer;
  @ViewChild(ImprintComponent) imprint;

  constructor() {}

  ngAfterViewInit(){
    console.log('PARENT: footer.imprintOpen is',this.footer.imprintOpen);
    console.log('PARENT: this.imprintOpen is',this.imprintOpen);
    this.imprintOpen = this.footer.imprintOpen;
    console.log('PARENT: nach AfterviewInit this.imprintOpen is',this.imprintOpen);

  }

  ngOnChanges(){
    this.imprintOpen = this.footer.imprintOpen;
    console.log('PARENT: onChanges() this.imprintOpen is',this.imprintOpen);
  }

  
}
