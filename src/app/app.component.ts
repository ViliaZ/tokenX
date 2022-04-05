import { Component } from '@angular/core';
import { ImprintOpenService } from './Services/imprint-open.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  imprintOpen:boolean = false;
  title = 'tokenX'

  constructor(public imprintService: ImprintOpenService) { }



  
}
