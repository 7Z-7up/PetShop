import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhmedalaaComponent } from './ahmedalaa.component';

describe('AhmedalaaComponent', () => {
  let component: AhmedalaaComponent;
  let fixture: ComponentFixture<AhmedalaaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AhmedalaaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AhmedalaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
