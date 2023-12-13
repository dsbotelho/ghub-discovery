import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryContainerComponent } from './discovery-container.component';

describe('DiscoveryContainerComponent', () => {
  let component: DiscoveryContainerComponent;
  let fixture: ComponentFixture<DiscoveryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscoveryContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscoveryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
