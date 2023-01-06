import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RazorpayCartComponent } from './razorpay-cart.component';

describe('RazorpayCartComponent', () => {
  let component: RazorpayCartComponent;
  let fixture: ComponentFixture<RazorpayCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RazorpayCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RazorpayCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
