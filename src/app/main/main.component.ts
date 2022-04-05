import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AssetsService } from '../Services/assets.service';
import { FooterComponent } from '../footer/footer.component';
import { ImprintComponent } from '../imprint/imprint.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @Input() currentTab: string = 'graph'


  constructor(private assets:AssetsService) { }

  ngOnInit(): void {    
  }

}
