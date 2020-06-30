import { Component, OnInit } from "@angular/core";
import { GroupService } from "@app/shared/services/util/group.service";
import { Group } from "@app/shared/interfaces";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { AuthService } from "@app/shared/services";

@Component({
  selector: "app-group-manager",
  templateUrl: "./group-manager.component.html",
  styleUrls: ["../manage.component.scss", "../../dashboard.component.scss"],
})
export class GroupManagerComponent implements OnInit {
  groups$ = new Observable<Group[] | null>();
  current$ = new Observable<Group | null>();
  show: Boolean = true;
  confirmLeave: Boolean = false;
  createGroup: Boolean = false;
  constructor(
    private groupService: GroupService,
    private authService: AuthService
  ) {
    this.groups$ = this.groupService.getUserGroup();
  }

  groupForm = new FormGroup({
    name: new FormControl(null),
    description: new FormControl(null),
    privacy: new FormControl(null),
  });

  get name(): AbstractControl {
    return this.groupForm.get("name")!;
  }

  get description(): AbstractControl {
    return this.groupForm.get("description")!;
  }

  get privacy(): AbstractControl {
    return this.groupForm.get("privacy")!;
  }

  leave() {
    // TODO confirm leave button (grey out card with button in center)
    this.current$.subscribe((group) => {
      if (group?._id) {
        this.groupService.leave(group._id).subscribe((res) => console.log(res));
      }
    });
  }

  detail(group: Group) {
    this.groups$.subscribe((groups) => {
      groups?.forEach((el) => (el === group ? (this.current$ = of(el)) : null));
    });
    this.createGroup = false;
  }

  new() {
    this.createGroup = true;
  }

  // TODO reload component
  create() {
    this.groupService
      .new(this.name.value, this.description.value, this.privacy.value)
      .subscribe();
    this.authService.me().subscribe((user) => (window.user = user));
    this.groupService.setUserGroup();
    this.groups$ = this.groupService.getUserGroup();
  }

  ngOnInit() {}
}
