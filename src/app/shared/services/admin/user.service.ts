import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "@app/shared/interfaces";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}

  update(
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
