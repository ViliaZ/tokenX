import { Component, Input, OnInit } from '@angular/core';
import { AssetsService } from '../assets.service';

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
