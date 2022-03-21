import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../assets.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  constructor(private assets:AssetsService) { }

  ngOnInit(): void {    
  }

}
