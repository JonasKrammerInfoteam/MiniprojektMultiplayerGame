import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameinfoComponent } from './game-info.component';

describe('GameinfoComponent', () => {
  let component: GameinfoComponent;
  let fixture: ComponentFixture<GameinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
