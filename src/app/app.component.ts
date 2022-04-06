import { Component, HostListener } from '@angular/core';
import { ImprintOpenService } from './Services/imprint-open.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  imprintOpen:boolean = false;
  title = 'tokenX'

  public currScreenWidth: any;  // for Hostlistener
  public currScreenHeight: any; // for Hostlistener

  constructor(public imprintService: ImprintOpenService) { }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.currScreenWidth = window.innerWidth;
    this.currScreenHeight = window.innerHeight;
  }

  
}
