import { Component } from '@angular/core';
import { GlobalConstants } from 'src/app/Services/global.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent {
  
  public animationsEnabled : boolean = GlobalConstants.EnableAnimations;
  websiteLink : string = "infoteam.de";
  animations : string = "Animationen: ";
  
  changeAnimationsEnabled() : void {
    if(GlobalConstants.EnableAnimations == true) {
      GlobalConstants.EnableAnimations = false;
    } else {
      GlobalConstants.EnableAnimations = true;
    }
  }

}
