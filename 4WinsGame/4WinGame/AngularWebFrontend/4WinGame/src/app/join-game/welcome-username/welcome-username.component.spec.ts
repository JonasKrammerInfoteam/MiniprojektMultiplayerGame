import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeUsernameComponent } from './welcome-username.component';

describe('WelcomeUsernameComponent', () => {
  let component: WelcomeUsernameComponent;
  let fixture: ComponentFixture<WelcomeUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeUsernameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
