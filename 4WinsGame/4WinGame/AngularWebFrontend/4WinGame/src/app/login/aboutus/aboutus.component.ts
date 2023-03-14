import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AnimationService } from 'src/app/Services/animation.service';
import { Developer } from './developerInterface';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit, OnDestroy {
  teamDescription: string = "Das Entwicklerteam mit Tätigkeiten:";
  headLine: string = "Über die Entwicklung";
  bulledPoint: string = "► ";
  aboutUsText: string = "Das infoteam-Vier-Gewinnt-Spiel ist ein <strong>Azubi</strong>-Projekt und wurde in einem <strong>Workshop</strong> umgesetzt und entwickelt." 
    + "<br> Unser Ziel war es, ein <strong>Softwareprojekt</strong> komplett selbstständig durchzuführen - inkl. der vorangehenden <strong>Planung</strong>."
    + "<br> Dabei erhielten wir <strong>Unterstützung</strong> vom ehemaligen Azubi <strong>Jonas Krammer</strong>, der nun bei infoteam als Software-Developer tätig ist."
    + "<br> Am Anfang diskutierten wir über die Idee und planten die Umsetzung durch Erstellung von <strong>Klassendiagrammen</strong>."
    + "<br> Nachdem wir unsere Grundlage geschaffen hatten, setzten wir die <strong>Entwicklungsumgebung</strong> auf und installierten alle notwendigen Tools."
    + "<br> Wir nutzten <strong>Visual Studio</strong> zur Umsetzung des <strong>Backends</strong>, also vereinfacht gesagt die gesamte Spiellogik, die auf dem Server läuft,"
    + "<br><strong>Visual Studio Code</strong> für die Umsetzung des <strong>Frontend</strong>, also all das, was der Benutzer auf der Website sehen kann, "
    + "<br>sowie <strong>git</strong> als Tool für die <strong>Versionsverwaltung</strong>, damit wir gemeinsam an verschiedenen Baustellen arbeiten konnten."
    public animationsEnabled : boolean | undefined;
    private destroy$ : Subject<boolean> = new Subject();
    private pictureLeft : boolean = true;
  
    constructor(private animationService : AnimationService){}
    
  public developerList: Developer[] = [];


  ngOnInit(): void {
    this.animationService.getAnimationsEnabled$().pipe(takeUntil(this.destroy$)).subscribe((value : boolean) => {
      this.animationsEnabled = value;
     });
    this.AddDeveloper("Jonas Krammer", ["Tätigkeit als Projektleiter", "Unterstützung bei Fragen & Problemen"]);
    this.AddDeveloper("Judith Semenyo", ["Schreiben und Durchführen von Unit-Tests", "Aufsetzen eines kleinen Netzwerkes"]);
    this.AddDeveloper("Jakob Leistner", ["Entwicklung der BusinessLogic", "Umsetzung des Frontends mit Angular"]);
    this.AddDeveloper("Simon Rösch", ["Entwicklung des RTPHub & der RestAPI", "Umsetzung & Weiterentwicklung des Frontends mit Angular"], "../../assets/pictures/SimonPicture.jpg");
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }


  private AddDeveloper(name: string, activites: string[], profileURL: string = "../../assets/pictures/UnknownProfile.svg"): void {
    this.developerList.push({ devName: name, projectActivities: activites, isPictureLeft: this.pictureLeft, profilePictureUrl: profileURL });
    this.pictureLeft = !this.pictureLeft;
  }

}
