import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamerulesComponent } from './gamerules.component';

describe('GamerulesComponent', () => {
  let component: GamerulesComponent;
  let fixture: ComponentFixture<GamerulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamerulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamerulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
