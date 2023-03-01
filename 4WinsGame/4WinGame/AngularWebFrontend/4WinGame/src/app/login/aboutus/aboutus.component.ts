import { Component, OnInit } from '@angular/core';
import { Developer } from './developer';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  public developerList : Developer[] = [];
  private pictureLeft : boolean = true;

  public ngOnInit() : void {
    this.AddDeveloper(new Developer("Jonas Krammer", ["Tätigkeit als Projektleiter", "Unterstützung bei Fragen & Problemen"], this.pictureLeft));
    this.AddDeveloper(new Developer("Judith Semenyo", ["Schreiben und Durchführen von Unit-Tests", "Aufsetzen eines kleinen Netzwerkes"], this.pictureLeft));
    this.AddDeveloper(new Developer("Jakob Leistner", ["Entwicklung des RTPHub & der RestAPI", "Umsetzung des Frontends mit Angular"], this.pictureLeft));
    this.AddDeveloper(new Developer("Simon Rösch", ["Tätigkeit als Projektleiter", "Umsetzung & Weiterentwicklung des Frontends mit Angular"], this.pictureLeft, "../../assets/SimonPicture.jpg"));
  }

  private AddDeveloper(developer : Developer) : void {
      this.developerList.push(developer);
      this.pictureLeft = !this.pictureLeft;
  }

}
