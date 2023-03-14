import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  private animationsEnabled : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public getAnimationsEnabled$() : Observable<boolean> {
    return this.animationsEnabled.asObservable();
  }

  public setAnimationsEnabled(value : boolean) : void {
    this.animationsEnabled.next(value);
  }


}
