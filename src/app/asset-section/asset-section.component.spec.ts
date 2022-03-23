import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSectionComponent } from './asset-section.component';

describe('AssetSectionComponent', () => {
  let component: AssetSectionComponent;
  let fixture: ComponentFixture<AssetSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
