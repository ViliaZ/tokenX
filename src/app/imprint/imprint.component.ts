import { Component, Input, OnInit, Output } from '@angular/core';
import { ImprintOpenService } from '../Services/imprint-open.service';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit {

  constructor(public imprintService: ImprintOpenService) { }

  ngOnInit(): void {
  }

  closeImprint() {
    this.imprintService.imprintOpen = false;
  }
}
