import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { ImprintOpenService } from './Services/imprint-open.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  imprintOpen:boolean = false;
  title = 'tokenX'

  public currScreenWidth: any;  // for Hostlistener
  public currScreenHeight: any; // for Hostlistener

  constructor(public imprintService: ImprintOpenService) { }

  ngAfterViewInit(): void {
    this.onWindowResize();
    setTimeout(()=>{this.onWindowResize()},300);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.currScreenWidth = window.innerWidth;
    this.currScreenHeight = window.innerHeight;
  }

  
}
