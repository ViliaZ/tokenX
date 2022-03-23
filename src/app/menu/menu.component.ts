import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  activeTab: string = 'graph';

  constructor() { }

  ngOnInit(): void {
  }

  tabAnimation(activeTab) {
    if (this.activeTab == '' || this.activeTab !== activeTab) {
      this.activeTab = activeTab;
    }
  }

}
