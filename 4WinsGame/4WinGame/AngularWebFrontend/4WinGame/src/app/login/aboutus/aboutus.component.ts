import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/Services/globalVariables';
import { Developer } from './developerInterface';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  public developerList : Developer[] = [];
  private pictureLeft : boolean = true;

  public animationsEnabled() : boolean {
    return GlobalConstants.EnableAnimations;
  }

  public ngOnInit() : void {

    this.AddDeveloper("Jonas Krammer", ["Tätigkeit als Projektleiter", "Unterstützung bei Fragen & Problemen"]);
    this.AddDeveloper("Judith Semenyo", ["Schreiben und Durchführen von Unit-Tests", "Aufsetzen eines kleinen Netzwerkes"]);
    this.AddDeveloper("Jakob Leistner", ["Entwicklung der BusinessLogic", "Umsetzung des Frontends mit Angular"]);
    this.AddDeveloper("Simon Rösch", ["Entwicklung des RTPHub & der RestAPI", "Umsetzung & Weiterentwicklung des Frontends mit Angular"], "../../assets/pictures/SimonPicture.jpg");
  }

  private AddDeveloper(name : string, activites : string[], profileURL : string = "../../assets/pictures/UnknownProfile.svg") : void {
      this.developerList.push({ devName : name, projectActivities : activites, isPictureLeft : this.pictureLeft, profilePictureUrl : profileURL });
      this.pictureLeft = !this.pictureLeft;
  }

}
