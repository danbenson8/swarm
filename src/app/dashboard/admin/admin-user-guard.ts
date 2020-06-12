import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AuthService } from "@app/shared/services";
import { userInfo } from "os";

@Injectable()
export class OnlyAdminUsersGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUser().pipe(
      map((user) => {
        if (!!user?.isAdmin) {
          return true;
        }

        this.router.navigateByUrl("/dashboard/manage/account");
        return false;
      })
    );
  }
}
