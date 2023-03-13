import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  public animationsEnabled : BehaviorSubject<boolean>;

  constructor() { 
    this.animationsEnabled = new BehaviorSubject<boolean>(true);
  }
}
