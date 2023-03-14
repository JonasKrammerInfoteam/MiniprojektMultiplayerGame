import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AnimationService } from 'src/app/Services/animation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit, OnDestroy{
  
  public animationsEnabled : boolean | undefined;
  private destroy$ : Subject<boolean> = new Subject();

  constructor(private animationService : AnimationService){}
  
  ngOnInit(): void {
   this.animationService.getAnimationsEnabled$().pipe(takeUntil(this.destroy$)).subscribe((value : boolean) => {
    this.animationsEnabled = value;
   });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  websiteLink : string = "infoteam.de";
  animations : string = "Animationen: ";
  
  changeAnimationsEnabled() : void {
    if(this.animationsEnabled == true) {
      this.animationService.setAnimationsEnabled(false);
    } else {
      this.animationService.setAnimationsEnabled(true);
    }
  }

}
