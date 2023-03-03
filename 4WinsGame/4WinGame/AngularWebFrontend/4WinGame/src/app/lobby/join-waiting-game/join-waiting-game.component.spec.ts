import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinWaitingGameComponent } from './join-waiting-game.component';

describe('JoinWaitingGameComponent', () => {
  let component: JoinWaitingGameComponent;
  let fixture: ComponentFixture<JoinWaitingGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinWaitingGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinWaitingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
