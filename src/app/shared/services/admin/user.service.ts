import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "@app/shared/interfaces";
import { tap, pluck } from "rxjs/operators";

interface GroupResponse {
  // TODO do i need a token here?
  members: any;
}

@Injectable({ providedIn: "root" })
export class UserService {
  private group$ = new BehaviorSubject<User[] | null>(null);

  constructor(private http: HttpClient) {}

  // TODO have a group collection listing users per group
  // then:
  // _id => user_id
  // group => group_id
  getGroup(_id: string, group: string): Observable<any> {
    return this.http
      .post<GroupResponse>("/api/util/group", {
        _id,
        group,
      })
      .pipe(
        tap(({ members }) => {
          this.group$.next(members);
        }),
        pluck("members")
      );
  }

  updateUser(
    forename: string,
    surname: string,
    email: string,
    upgradeToken: string,
    newPW: string,
    repeatPW: string
  ): Observable<any> {
    return this.http.post<User>(`/api/user/${window.user?._id}/update`, {
      forename,
      surname,
      email,
      newPW,
      repeatPW,
      upgradeToken,
    });
  }
}
