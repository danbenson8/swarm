import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { User, Group } from "@app/shared/interfaces";
import { UserService } from "../admin/user.service";

@Injectable({
  providedIn: "root",
})
export class GroupService {
  private userGroup$ = new BehaviorSubject<Group[]>([]);
  constructor(private http: HttpClient, private userService: UserService) {
    this.setUserGroup();
  }

  setUserGroup(): void {
    const userGroups = window.user?.groups;
    let userGroup: Group[] = [];
    for (let group of userGroups!) {
      this.detail(group).subscribe((group) => {
        userGroup.push(group);
      });
    }
    this.userGroup$.next(userGroup);
  }

  getUserGroup(): Observable<Group[] | null> {
    return this.userGroup$.asObservable();
  }

  detail(group: string): Observable<Group> {
    return this.http.post<Group>("/api/group/detail", {
      _id: group,
    });
  }

  new(name: string, description: string, privacy: string): Observable<Group> {
    return this.http.post<Group>("/api/group/new", {
      name: name,
      description: description,
      privacy: privacy,
    });
  }

  join(_id: string, _user: string, membership: string): Observable<User> {
    return this.http.post<User>("api/group/join", {
      _id: _id,
      _user: _user,
      membership: membership,
    });
  }

  leave(group: string): Observable<Group> {
    return this.http.post<Group>("/api/group/leave", { _id: group });
  }
}
