import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "@app/shared/interfaces";

@Injectable({ providedIn: "root" })
export class UserService {
  private users$ = new BehaviorSubject<User[] | null>(null);

  constructor(private http: HttpClient) {}

  /*
  listUsers(): Observable<User[]> {
    // TODO grab users from database
  

  }
  */
}
