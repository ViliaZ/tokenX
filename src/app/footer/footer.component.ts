import { Component, OnInit } from '@angular/core';
import { ImprintOpenService } from '../Services/imprint-open.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

  constructor(private imprintService: ImprintOpenService) { }

  ngOnInit(): void {
  }

  openImprint() {
    this.imprintService.imprintOpen = true;
  }

}
