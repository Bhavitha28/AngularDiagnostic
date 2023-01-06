import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpackageComponent } from './userpackage.component';

describe('UserpackageComponent', () => {
  let component: UserpackageComponent;
  let fixture: ComponentFixture<UserpackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserpackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserpackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
