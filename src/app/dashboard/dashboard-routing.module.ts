import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { AuthGuard } from "@app/shared/guards";
import { AccountManagerComponent } from "./manage/account-manager/account-manager.component";
import { SessionManagerComponent } from "./manage/session-manager/session-manager.component";
import { GroupManagerComponent } from "./manage/group-manager/group-manager.component";
import { UserAdministrationComponent } from "./admin/user-administration/user-administration.component";
import { OnlyAdminUsersGuard } from "./admin/admin-user-guard";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "admin/user/all",
        pathMatch: "full",
      },
      {
        path: "manage",
        children: [
          { path: "account", component: AccountManagerComponent },
          { path: "groups", component: GroupManagerComponent },
          { path: "session/all", component: SessionManagerComponent },
        ],
      },
      {
        path: "admin",
        canActivate: [OnlyAdminUsersGuard],
        children: [
          { path: "user/all", component: UserAdministrationComponent },
        ],
      },
    ],
  },
];

export const DashboardRoutingModule = RouterModule.forChild(routes);
