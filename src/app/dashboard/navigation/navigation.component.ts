import { Component, OnInit, Input } from "@angular/core";
import { User } from "@app/shared/interfaces";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss", "../dashboard.component.scss"],
})
export class NavigationComponent implements OnInit {
  @Input() user: User | null = window.user;

  constructor() {}

  ngOnInit() {}
}
