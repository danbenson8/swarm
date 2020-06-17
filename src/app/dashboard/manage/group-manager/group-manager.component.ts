import { Component, OnInit } from "@angular/core";
import { GroupService } from "@app/shared/services/util/group.service";
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
  constructor(private groupService: GroupService) {}

  getMembers(groupName: string) {
    this.group.current = groupName;
    this.groupService
      .get(this.user._id, groupName)
      .subscribe((res: User[]) => (this.group.members = res));
  }

  ngOnInit() {}
}
