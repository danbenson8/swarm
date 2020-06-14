import { Component, OnInit } from "@angular/core";
import { UserService } from "@app/shared/services/admin/user.service";
import { User } from "@app/shared/interfaces";
import { string } from "joi";

@Component({
  selector: "app-group-manager",
  templateUrl: "./group-manager.component.html",
  styleUrls: ["../manage.component.scss", "../../dashboard.component.scss"],
})
export class GroupManagerComponent implements OnInit {
  user = <User>window.user;
  group = {
    current: "",
    members: <User[]>[],
  };
  constructor(private userService: UserService) {}

  getMembers(groupName: string) {
    this.group.current = groupName;
    this.userService
      .getGroup(this.user._id, groupName)
      .subscribe((res: User[]) => (this.group.members = res));
  }

  ngOnInit() {}
}
