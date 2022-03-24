import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ImprintOpenService } from '../imprint-open.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})


export class FooterComponent implements OnInit {

imprintOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  openImprint(){
    this.imprintOpen = true;
    console.log('footerComponent, imprintOpen =', this.imprintOpen);

  }

}
