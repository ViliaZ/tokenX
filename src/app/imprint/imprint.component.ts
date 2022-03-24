import { Component, Input, OnInit, Output } from '@angular/core';
import { ImprintOpenService } from '../imprint-open.service';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit {

  // @Input() imprintOpen;


  imprintOpen: boolean = false;

  constructor(public imprintService: ImprintOpenService) { }

  ngOnInit(): void {
  }

  closeImprint() {
    this.imprintOpen = false;
  }
}
