import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // pause video playback
    let video = <HTMLMediaElement>document.getElementById("landing-video");
    if (video) {
      video.parentElement?.removeChild(video);
    }
  }
}
