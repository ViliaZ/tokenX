import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMobilComponent } from './sidebar-mobil.component';

describe('SidebarMobilComponent', () => {
  let component: SidebarMobilComponent;
  let fixture: ComponentFixture<SidebarMobilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarMobilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarMobilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
